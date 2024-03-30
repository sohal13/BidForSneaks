import axios from 'axios';
import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const VerifyOtp = () => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [loading ,setLoading] = useState(false);
console.log(otp);
    const handleChange = (value) => {
        setOtp(value);
    };
    const handleVerify =async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`/api/auth/number-verify/otp`,{otp})
            const data = res.data;
            if(data.success === false){
              setLoading(false);
              console.log(data.message);
              return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
            }
            toast.success(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
            setLoading(false)
            navigate('/login')

        } catch (error) {
             setLoading(false)
            console.log(error);
            return toast.error(error?.response?.data?.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
        }
    };
    return (
        <div className='h-full flex justify-center curved-corner'>
            <div className=' flex justify-center items-center '>
                <div className='flex flex-col gap-2 bg-blue-600 md:w-[400px]  min-w-[300px]  h-auto rounded-lg'>
                    <h1 className='text-4xl font-bold text-center text-white mt-4'>
                        Verify <span className='text-yellow-400'>OTP</span>
                    </h1>
                    <form  onSubmit={handleVerify} className='p-2 flex flex-col gap-4'>
                        <div className='flex gap-2 items-center justify-center'>
                        <OtpInput 
                            value={otp}
                            onChange={handleChange}
                            numInputs={6} // Number of OTP input fields
                            separator={<span>+</span>} // Optional: Separator between input fields
                            renderInput={(props) => <input {...props} 
                            maxLength={1}
      className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-blue-500"
      style={{ marginRight: '10px' }} 
      required
      />}
                        />
                        </div>
                        <button type='submit' className='text-xl p-2 self-center font-bold hover:bg-yellow-400 bg-white w-[200px] py-2 rounded-lg'>Verify OTP</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default VerifyOtp