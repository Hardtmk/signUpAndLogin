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



app.post('/signup',async(req,res)=>{
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
 password:hashedPassword,
   }
const insertData = await schema.create(data)

    const token = jwt.sign(insertData.toJSON(),username, {
            expiresIn: 60 * 24
        }) 

    res.status(201).json({token,userID:insertData.id})
 }catch(error){
  console.log(error)
 }
})

app.post('/login',async(req,res)=>{
  const {username,password}=req.body

  try{

const haveUsername = await schema.findOne({username})

const Rightpassword = await bcrypt.compare(password,haveUsername.password)

if(haveUsername && Rightpassword){
    const token = jwt.sign(haveUsername.toJSON(),username, {
            expiresIn: 60 * 24
        }) 
        console.log('send')
            res.status(201).json({token, userID: haveUsername.id})
}


  }catch(error){
next(error)
  }

})

app.patch('/:id',async(req,res,next)=>{

     const { id} = req.params
     console.log(id)
  const {password}=req.body
  try{
      const hashedPassword = await bcrypt.hash(password,10)
  const UpdatePassword = await schema.findOneAndUpdate({_id:id},{password:hashedPassword,
  new: true,
    runValidators: true,  
  })
  res.status(200).json({ UpdatePassword })
  }catch(error){
next(error)
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
