import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Page (){

const [cookies, setCookie, removeCookie]=useCookies(null)
const [changePassword, setChangePassword]=useState(false)
const [password,setPassword]=useState(null)
const [confirmPassword,setConfirmPassword]=useState(null)
let navigate = useNavigate()

console.log('userID='+cookies.userID)
console.log('userID='+cookies.AuthToken)
// 如何設置攔截功能呢？
const logout=()=>{
removeCookie('Userid',cookies.Userid)
removeCookie('AuthToken',cookies.AuthToken)
navigate('/')
window.location.reload()
}


console.log('password='+password)
console.log('confirmedPassword='+confirmPassword)
const handlePassword= ()=>{
    document.querySelector('.changePassword').classList.add('hidden')
    setChangePassword(true)

}
const handleClick=()=>{
    setChangePassword(false)
     document.querySelector('.changePassword').classList.remove('hidden')
}
  var passwordReg =/^(?=.*[A-Z])\w{8,}\S$/
     const standardPassword = passwordReg.test(password)

const handleSubmit = async(e)=>{
    
    e.preventDefault()
    console.log('submit')
    if(changePassword&&(password!==confirmPassword)){
        alert('密碼輸入錯誤')
        return
    }

    if(!standardPassword){
        alert('密碼格式錯誤')
        return
    }
   try{
       
  const response = await axios.patch(`http://localhost:8000/${cookies.Userid}`,{password:password})
//   const response = await axios.patch(`http://localhost:8000/123`,{password:password})
console.log(response.status)
console.log(response)

alert('change has been made')
      
   }catch(error){
       console.log(error)
   }
}


return (
<div className='background'>
<nav>
 <FontAwesomeIcon className='icon' icon={faComputer}></FontAwesomeIcon>
 <button className='logout' onClick={logout}>logout</button>
 </nav>


<button className='changePassword' onClick={handlePassword}>Change Your Password</button>

<div className='Pagemodel'>
{
    changePassword && 
    
        <form className='token' onSubmit={handleSubmit}>
             <FontAwesomeIcon className='closeBtn'
      icon= {faXmark}onClick={handleClick}></FontAwesomeIcon>
         <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="change your password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                     <input
                    type="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirmed password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <input className="submit" type="submit"/>
    </form>
}


</div>
</div>

)


}
