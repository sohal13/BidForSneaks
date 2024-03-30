import React, { useState } from 'react'
import './Registerr.css'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

  const navigate = useNavigate();

  const [formData, setfromData] = useState({});
  const [loading , setLoading] = useState(false);

  const handelChnage = (e) => {
    setfromData({
      ...formData, [e.target.id]: e.target.value
    })
  }

  const handelSubmit =async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword.toLowerCase()) return toast.error("Password & Confirm-Password Dosen't Match", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })

    setLoading(true)
try {
  const res = await axios.post(`/api/auth/register`,formData);
  const data = res.data;
  if(data.success === false){
    setLoading(false);
    console.log(data.message);
    return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
  }
  localStorage.setItem('BidForSneaks',JSON.stringify(data));
  setLoading(false)
  navigate('/login')

} catch (error) {
  setLoading(false)
  return toast.error(error?.response?.data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
  console.log(error);
}
  }

  console.log(formData);
  return (
    <div className='h-full flex justify-center curved-corner'>
      <div className=' flex justify-center items-center '>
        <div className='flex flex-col gap-2 bg-blue-600 md:w-[400px]  min-w-[300px]  h-auto rounded-lg'>
          <h1 className='text-4xl font-bold text-center text-white mt-4'>
            BidForSneaks <br /> <span className='text-yellow-400'>Register</span>
          </h1>
          <form onSubmit={handelSubmit} className='p-2 flex flex-col gap-4'>
            <div className='flex flex-col gap-1 px-2'>
              <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Name :</label>
                <input type='text' id='username' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Name' required />
              </div>
              <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Email :</label>
                <input type='email' id='useremail' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Email' required />
              </div>
              <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Number :</label>
                <input type='number' id='usernumber' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Number' required />
              </div>
              <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Password :</label>
                <input type='password' id='password' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Password' required />
              </div>
              <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Confirm Password :</label>
                <input type='text' id='confirmpassword' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Confirm Password' required />
              </div>
            </div>
            <button type='submit' className='text-xl p-2 self-center font-bold hover:bg-yellow-400 bg-white w-[200px] py-2 rounded-lg'>
              {loading ? 'Registring..':'Register'}
            </button>
          </form>
          <div className='p-2'>
                    <p className='text-sm font-semibold'> Have an Acount ? <Link to={'/login'} ><span className='text-yellow-600 font-bold underline cursor-pointer hover:text-gray-950'>
                        logIn Now!!</span></Link>
                    </p>
                </div>
        </div>
      </div>
    </div>
  )
}

export default Register