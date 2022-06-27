
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
 const response =await axios.post(`http://localhost:8000/${signUp? 'signup': 'login'}`,{username,password})
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

