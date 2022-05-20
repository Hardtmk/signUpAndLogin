import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Page (){

const [cookies, setCookie, removeCookie]=useCookies(null)
let navigate = useNavigate()
    if(!cookies.AuthToken){
 navigate('/')
 window.location.reload()
}
// 如何設置攔截功能呢？
const logout=()=>{
removeCookie('UserId',cookies.userId)
removeCookie('AuthToken',cookies.AuthToken)
navigate('/')
window.location.reload()
}
return (
<div>

 <h1>Welcome</h1>
 <button onClick={logout}>logout</button>
</div>

)


}

