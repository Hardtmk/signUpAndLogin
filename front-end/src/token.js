
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Token({signUp,userRecord,setUserRecord}) {
let [username, setUsername]=useState(null)
let [password, setPassword]=useState(null)
let [confirmPassword, setConfirmPassword]=useState(null)
let [error, setError] = useState(null)
const [ cookies, setCookie, removeCookie] = useCookies(null)



const navigate = useNavigate()
const handleClick=()=>{
  setUserRecord(false)
       document.querySelector('.startBtn').classList.remove('hidden')

}
const handleSubmit= async(e)=>{

  var passwordReg =/^(?=.*[A-Z])\w{8,}\S$/
  const standardPassword = passwordReg.test(password)
  console.log('submitted')
  e.preventDefault()
  try{

  if(signUp && (password!=confirmPassword)){
  alert('password and confirmed password do not match')
    return    
  }
    if(!standardPassword){
        alert('password format is wrong')
        return
    }

 const response =await axios.post(`http://localhost:8000/${signUp? 'signup': 'login'}`,{username,password})
console.log('noiossda')
 setCookie('AuthToken',response.data.token)
 setCookie('Userid',response.data.userID)
 console.log(response.data)
  const success = response.status === 201
if(success){
navigate('./page')
}
     window.location.reload()
}catch(error){
  console.log(error)
}
}



  return (
    <div className='token'>
             <FontAwesomeIcon className='closeBtn'
      icon= {faXmark}onClick={handleClick}></FontAwesomeIcon>

 <form className='form' onSubmit={handleSubmit}>
 <input
type="username"
id="username"
name="username"
placeholder="username"
required={true}
onChange={(e) => setUsername(e.target.value)}
 />
 {signUp && <p>containes at least one uppercase and no space in more than 8 characters password</p>}
 <input
 type='text'
 required={true}
 name='password'
 placeholder='password'
   onChange={(e) => setPassword(e.target.value)}
 />
 
{signUp &&
 <input
 type='text'
 required={true}
 name='confirmPassword'
 placeholder='confirmPassword'
 onChange={(e)=>setConfirmPassword(e.target.value)}
 />
}
<input className='submit' type='submit'/>
</form>
    </div>
  )
}

