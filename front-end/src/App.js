import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Page from './page';


function App() {

  return (
    <BrowserRouter>
    
    <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path='/page' element={<Page/>}/>

<Route path="*" element={<p>找不到頁面</p>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
