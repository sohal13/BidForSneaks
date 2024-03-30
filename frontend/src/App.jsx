import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login.jsx';
import VerifyNumber from './pages/register/VerifyNumber.jsx';
import VerifyOtp from './pages/register/VerifyOtp.jsx';

function App() {

  return (
    <>
      <div className='w-full h-screen'>
        <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/verifynumber' element={<VerifyNumber/>}/>
    <Route path='/verifynumber' element={<VerifyNumber/>}/>
    <Route path='/verifynumber/otp' element={<VerifyOtp/>}/>

    <Route path='/login' element={<Login/>}/>

        </Routes>
        <ToastContainer/>
       </div>
    </>
  )
}

export default App
