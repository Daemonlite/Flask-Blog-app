
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import Register from './pages/Register';
import Home from './pages/Home';
import NavBar from './components/NavBar';


function App() {
  return (
    <div>
     <BrowserRouter>
     <ToastContainer position='bottom-left'/>
     <NavBar/>
     <Routes>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/' element={<Home/>}/>
   
     </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;
