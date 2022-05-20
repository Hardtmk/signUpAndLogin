import  Token from './token'
import { useState } from 'react'
import {useCookies} from "react-cookie"

const Home= () => {

const [signUp, setSignUp] = useState(true)
const [userRecord, setUserRecord] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

const handleClick=()=>{
 setSignUp(false)
setUserRecord(true)
}
const handleSecondClick=()=>{
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
 setUserRecord(true)
 setSignUp(true)
}

return (
 <div>
<nav>
  <h1>你好嗎</h1>
 <div className='logo'>logo</div>
 <button
  className='login' 
  onClick={handleClick}
  >
   login
   </button>
</nav>

<div>
<button
 onClick={handleSecondClick}
 >
  開始你的日記之旅吧
  </button>
{userRecord && (
<Token 
setUserRecord={setUserRecord} 
userRecord={userRecord} 
signUp={signUp}/>

 )} 
 </div>
 </div>

)
}

export default Home