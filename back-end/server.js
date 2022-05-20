const express = require('express')
const port = 8000
const connectDB=require('./db/connect')
const schema = require('./model/schema')
require('dotenv').config();


const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {v4: uuidv4} = require('uuid')
const cors = require('cors')
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.post('/',async(req,res)=>{
  const {username,password}=req.body
  const hashedPassword = await bcrypt.hash(password,10)
  const generatedUserId = uuidv4()
 try{
const haveUsername = await schema.findOne({username})

if(haveUsername){
  return res.status(409).send('User already exists, Please login')
}
   const data = {
    username:username,
 password:hashedPassword
   }
const insertData = await schema.create(data)
console.log('insertData='+insertData)

     const token = jwt.sign(insertData.toJSON(), username, {
            expiresIn: '120s'
        })
        console.log('token='+token)
    res.status(201).json({token, userId: generatedUserId})

 }catch(error){
  console.log(error)
 }
})


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start()


   // app.listen(port, () =>
   //    console.log(`Server is listening on port ${port}...`)
   //  );