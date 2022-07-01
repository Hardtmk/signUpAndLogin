import  Token from './token'
import { useState } from 'react'
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
     document.querySelector('.startBtn').classList.add('hidden')
}

return (
 <div>
<nav>
 <FontAwesomeIcon className='icon' icon={faComputer}></FontAwesomeIcon>
 <button
  className='login' 
  onClick={handleClick}
  >
   login
   </button>
</nav>

<div className='model'>
<button
className='startBtn'
 onClick={handleSecondClick}
 >
SignUp
  </button>
{userRecord && (
<Token 
className='token'
setUserRecord={setUserRecord} 
userRecord={userRecord} 
signUp={signUp}/>

 )} 
 </div>
 </div>

)
}

export default Home