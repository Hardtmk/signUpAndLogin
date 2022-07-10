require('express-async-errors');
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const schema = require('./model/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const { BadRequestError } = require('./errors');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(errorHandlerMiddleware);
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const generatedUserId = uuidv4();

  try {
    const haveUsername = await schema.findOne({ username });

    if (haveUsername) {
      return res.status(409).send('User already exists, Please login');
    }
    const data = {
      username: username,
      password: hashedPassword,
    };
    const insertData = await schema.create(data);

    const token = jwt.sign(insertData.toJSON(), username, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({
      token,
      userID: insertData.id,
      message: username + ' account have created',
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const haveUsername = await schema.findOne({ username });
    if (!haveUsername) {
      res.status(400).json('do not have username');
      throw new BadRequestError('do not have username');
    }
    const Rightpassword = await bcrypt.compare(password, haveUsername.password);

    if (!Rightpassword) {
      res.status(400).json('password and email do not match');
      throw new BadRequestError('password and email do not match');
    }

    if (haveUsername && Rightpassword) {
      const token = jwt.sign(haveUsername.toJSON(), username, {
        expiresIn: 60 * 24,
      });

      res.status(201).json({
        token,
        userID: haveUsername.id,
        message: username + ' have successfully logged in',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const UpdatePassword = await schema.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword, new: true, runValidators: true }
    );
    res.status(200).json({ UpdatePassword });
  } catch (error) {
    next(error);
  }
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server is listening on port 8000...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
