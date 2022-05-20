// import { set } from 'mongoose'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'



export default function Token({signUp,userRecord,setUserRecord}) {
let [username, setUsername]=useState(null)
let [password, setPassword]=useState(null)
let [confirmPassword, setConfirmPassword]=useState(null)
const [cookies, setCookie,removeCookie] = useCookies(null)

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
 const response =await axios.post("http://localhost:8000",{username,password})
 const success = response.status === 201
 if(success) navigate('/page')
 setCookie('AuthToken',response.data.token)
 setCookie('UserId',response.data.userId)


 window.location.reload()
  
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

