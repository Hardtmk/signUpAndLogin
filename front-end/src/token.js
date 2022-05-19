import { set } from 'mongoose'
import { useState } from 'react'
import axios from 'axios'



export default function Token({signUp,userRecord,setUserRecord}) {
let [username, setUsername]=useState(null)
let [password, setPassword]=useState(null)
let [confirmPassword, setConfirmPassword]=useState(null)


const handleClick=()=>{
  setUserRecord(false)
}
const handleSubmit= async(e)=>{
  console.log('submitted')
  // console.log(username,password)
  e.preventDefault()

  try{
  // if(signUp && (password!=confirmPassword)){
  // return    
  // }
// 這個應該是for登記用的吧
 const response =await axios.get("http://localhost:8000")
console.log('response='+response.data.data[0].username)
  
}catch(error){
  console.log(error)
}
}
  return (
    <div>
      <button onClick={handleClick}>關閉頁面</button>

 <form onSubmit={handleSubmit}>
 <input
 type='text'
 required
 name='username'
 placeholder='用戶名字'
 value={username}//現在的username是一個空值，所以value也是一個空值
 onChange={(e)=>setUsername(e.target.value)}
 />
 <input
 type='text'
 required
 name='password'
 placeholder='密碼'
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 />
 
{signUp &&
 <input
 type='text'
 required
 name='confirmPassword'
 placeholder='確認密碼'
 value={confirmPassword}
 onChange={(e)=>setConfirmPassword(e.target.value)}
 />
}
<input className='submit' type='submit'/>
</form>
<div></div>
    </div>
  )
}

