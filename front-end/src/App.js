import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Page from './page';
import {useCookies} from 'react-cookie'


function App() {   
   const [cookies, setCookie, removeCookie] = useCookies(['username'])
   
const authToken = cookies.AuthToken
console.log(authToken)

  return (
    <BrowserRouter>
  
    <Routes>

  <Route path="/" element={<Home/>}/>
  {authToken && <Route path='/page' element={<Page/>}/>}

<Route path="*" element={<p>找不到頁面</p>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
