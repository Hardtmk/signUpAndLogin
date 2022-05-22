// import { set } from 'mongoose'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'





export default function Token({signUp,userRecord,setUserRecord}) {
let [username, setUsername]=useState(null)
let [password, setPassword]=useState(null)
let [confirmPassword, setConfirmPassword]=useState(null)


const navigate = useNavigate()
const handleClick=()=>{
  setUserRecord(false)
}
const handleSubmit= async(e)=>{
  

  console.log('submitted')
  // console.log(username,password)
  e.preventDefault()
  

  

  try{
  if(signUp && (password!=confirmPassword)){
  return    
  }
// 這個應該是for登記用的吧
// 如果是signup, 就由signup這個網站傳輸數據
// 如果是signup是false,就由login這個網站傳送數據
 const response =await axios.post(`http://localhost:8000/${signUp? 'signup': 'login'}`,{username,password})
//  console.log(response.data.username)//zz
 const success = response.status === 201

  
}catch(error){
  console.log(error)
}
}
  return (
    <div>
      <button onClick={handleClick}>關閉頁面</button>

 <form onSubmit={handleSubmit}>
 <input
   type="username"
 id="username"
 name="username"
placeholder="username"
required={true}
onChange={(e) => setUsername(e.target.value)}
 />
 <input
 type='text'
 required={true}
 name='password'
 placeholder='密碼'
   onChange={(e) => setPassword(e.target.value)}
 />
 
{signUp &&
 <input
 type='text'
 required={true}
 name='confirmPassword'
 placeholder='確認密碼'
 onChange={(e)=>setConfirmPassword(e.target.value)}
 />
}
<input className='submit' type='submit'/>
</form>
<div></div>
    </div>
  )
}

