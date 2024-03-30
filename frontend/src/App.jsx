import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login.jsx';

function App() {

  return (
    <>
      <div className='w-full h-screen'>
        <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>

        </Routes>
        <ToastContainer/>
       </div>
    </>
  )
}

export default App
