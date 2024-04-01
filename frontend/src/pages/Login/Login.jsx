import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const Login = () => {

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
    setLoading(true)
try {
  const res = await axios.post(`/api/auth/login`,formData);
  const data = res.data;
  if(data.success === false){
    setLoading(false);
    console.log(data.message);
    return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
  }
  toast.success(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
  localStorage.setItem('BidForSneaks',JSON.stringify(data));
  setLoading(false)
  navigate('/')

} catch (error) {
  setLoading(false)
  return toast.error(error?.response?.data?.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
  console.log(error);
}
  }

  return (
    <div className='h-full flex justify-center curved-corner'>
      <div className=' flex justify-center items-center '>
        <div className='flex flex-col gap-2 bg-blue-600 md:w-[400px]  min-w-[300px]  h-auto rounded-lg'>
          <h1 className='text-4xl font-bold text-center text-white mt-4'>
            BidForSneaks <br /> <span className='text-yellow-400'>LogIn</span>
          </h1>
          <form onSubmit={handelSubmit} className='p-2 flex flex-col gap-4'>
          <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Email :</label>
                <input type='email' id='useremail' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Email' required />
              </div>
          <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Password :</label>
                <input type='password' id='password' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Password' required />
              </div>
              <button type='submit' className='text-xl p-2 self-center font-bold hover:bg-yellow-400 bg-white w-[200px] py-2 rounded-lg'>
              {loading ? 'Loging..':'Login'}
            </button>
            </form>
            <div className='p-2'>
                    <p className='text-sm font-semibold'> Don't have an AcCount ? <Link to={'/register'} ><span className='text-yellow-600 font-bold underline cursor-pointer hover:text-gray-950'>
                        Regsiter Now!!</span></Link>
                    </p>
                </div>
        </div>
      </div>
    </div>

  )
}

export default Login