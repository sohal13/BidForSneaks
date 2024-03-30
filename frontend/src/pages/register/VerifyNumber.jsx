import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const VerifyNumber = () => {
    const navigate = useNavigate();

    const [formData, setfromData] = useState({});
    const [loading, setLoading] = useState(false);

    const handelChnage = (e) => {
        const userInput = e.target.value;
        const formattedNumber = "+91" + userInput;
        setfromData({ [e.target.id]: formattedNumber })
    }

    const handelSubmit =async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`/api/auth/number-verify`,formData)
            const data = res.data;
            if(data.success === false){
              setLoading(false);
              console.log(data.message);
              return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
            }
            toast.success(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
            setLoading(false)
            navigate('/verifynumber/otp')
        } catch (error) {
            setLoading(false)
            console.log(error);
            return toast.error(error?.response?.data?.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
            
        }
    }
    return (

        <div className='h-full flex justify-center curved-corner'>
            <div className=' flex justify-center items-center '>
                <div className='flex flex-col gap-2 bg-blue-600 md:w-[400px]  min-w-[300px]  h-auto rounded-lg'>
                    <h1 className='text-4xl font-bold text-center text-white mt-4'>
                        BidForSneaks <br /> <span className='text-yellow-400'>Verify</span>
                    </h1>
                    <form onSubmit={handelSubmit} className='p-2 flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label className='text-2xl text-white font-bold'>Number :</label>
                            <input type='number' id='usernumber' onChange={handelChnage} className='py-2 rounded-lg p-2' placeholder='Enter Number' required />
                        </div>
                        <button type='submit' className='text-xl p-2 self-center font-bold hover:bg-yellow-400 bg-white w-[200px] py-2 rounded-lg'>
                            {loading ? 'Submiting..' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default VerifyNumber