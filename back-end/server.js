const express = require('express')
const port = 8000
const connectDB=require('./db/connect')
const schema = require('./model/schema')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {v4: uuidv4} = require('uuid')
const cors = require('cors')
const session = require('express-session')


const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())



// 配置
app.use(session({
  secret: 'qf project',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:10000*10 }//指定會話的有效時長
}))



//登錄攔截
app.get('/signup',function(req,res){
  // res.send('hellooo')

  var username=req.session.username
    // res.send(username)
    res.send('fdnjkfd')
    // 爲什麽是undefined呢
  console.log('session',username)


})


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
 password:hashedPassword
   }
const insertData = await schema.create(data)
// 就只會在8000/signup這個網址得到session 
 req.session.username=insertData.username
    res.status(201).json(insertData)
 }catch(error){
  console.log(error)
 }
})

app.post('/login',async(req,res)=>{
  const {username,password}=req.body
  try{
const haveUsername = await schema.findOne({haveUsername})
// 應該就是password進行hash 之後再進行比較
const Rightpassword = await bcrypt.compare(password,haveUsername.password)

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