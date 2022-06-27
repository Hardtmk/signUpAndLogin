
import { useNavigate } from 'react-router-dom'

export default function Page (){


let navigate = useNavigate()

// 如何設置攔截功能呢？

return (
<div>

 <h1>Welcome</h1>
 <button>logout</button>
</div>

)


}

