import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Page from './page';
import {useCookies} from 'react-cookie'

function App() {

  // if(path='/page'){
  //   console.log('page')
  // }
// ['user']爲什麽要這樣寫呢？
  const [cookies, setCookie,removeCookie]=useCookies(null)
  const AuthToken = cookies.AuthToken
  return (
    <BrowserRouter>
    
    <Routes>

  <Route path="/" element={<Home/>}/>
  {AuthToken && <Route path='/page' element={<Page/>}/>}

<Route path="*" element={<p>找不到頁面</p>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
