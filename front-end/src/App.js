import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Page from './page';



function App() {
  return (
    <BrowserRouter>
    
    <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path='/page' element={<Page/>}/>

  .

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
