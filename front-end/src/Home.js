import  Token from './token'
import { useState } from 'react'


const Home= () => {

const [signUp, setSignUp] = useState(true)
const [userRecord, setUserRecord] = useState(false)



const handleClick=()=>{
 setSignUp(false)
setUserRecord(true)
}
const handleSecondClick=()=>{

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