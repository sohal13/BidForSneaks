import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login.jsx';
import VerifyNumber from './pages/register/VerifyNumber.jsx';
import VerifyOtp from './pages/register/VerifyOtp.jsx';
import { VerifyIsUserLogin } from './pages/utils/VerfiyIsUserLogin.jsx';
import ListShoes from './pages/forSellers/ListShoes.jsx';
import SingleShoe from './pages/shoes/SingleShoe.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {

  return (
    <>
      <div className='w-full h-screen'>
        <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/verifynumber' element={<VerifyNumber/>}/>
    <Route path='/verifynumber/otp' element={<VerifyOtp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/shoes/:id' element={<SingleShoe/>}/>
    <Route element={<VerifyIsUserLogin/>}>
    </Route>
    <Route path='/listshoes' element={<ListShoes/>}/>
        </Routes>
        <ToastContainer/>
       </div>
    </>
  )
}

export default App
