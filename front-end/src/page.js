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
    if(!cookies.AuthToken){
 navigate('/')
 window.location.reload()
}
console.log('userID='+cookies.userID)
console.log('userID='+cookies.AuthToken)
// 如何設置攔截功能呢？
const logout=()=>{
removeCookie('UserId',cookies.userID)
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
       
  const response = await axios.patch(`http://localhost:8000/${cookies.userID}`,{password:password})
console.log(response)

      
   }catch(error){
       console.log(error)
   }
}


return (
<div>
<nav>
 <FontAwesomeIcon className='icon' icon={faComputer}></FontAwesomeIcon>
   <h1>Welcome</h1>
 <button className='logout' onClick={logout}>logout</button>
 </nav>

<div className='pageContainer'>
    
<button className='changePassword' onClick={handlePassword}>修改密碼</button>
     
{
    changePassword && 
    
        <form className='form' onSubmit={handleSubmit}>
             <FontAwesomeIcon className='closeBtn'
      icon= {faXmark}onClick={handleClick}></FontAwesomeIcon>
         <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="改變密碼"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                     <input
                    type="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="確認改變密碼"
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
