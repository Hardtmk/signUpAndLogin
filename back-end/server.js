const express = require('express')
const port = 8000
const connectDB=require('./db/connect')
const schema = require('./model/schema')
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.post('/',async(req,res)=>{
  const {username,password}=req.body
  const hashedPassword = await bcrypt.hash(password,10)

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

// const token = jwt.sign(insertData,username,{
//   expiresIn:60*24
// })
res.status(201).json({insertData})

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