import React from 'react'

const Register = () => {
  return (
    <div className='max-w-[95%] mx-auto h-full flex justify-center'>
      <div className='flex justify-center items-center'>
          <div className='flex flex-col gap-2 bg-blue-600 md:w-[400px]  max-w-[300px]  h-auto rounded-lg'>
              <h1 className='text-4xl font-bold text-center text-white mt-4'>
                BidForSneaks <br/> <span className='text-yellow-400'>Register</span>
              </h1>
              <form className='p-2 flex flex-col gap-4'>
                <div className='flex flex-col gap-1 px-2'>
                <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Name :</label>
                <input className='py-2 rounded-lg p-2' placeholder='Enter Name'/>
                </div>
                <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Email :</label>
                <input className='py-2 rounded-lg p-2' placeholder='Enter Email'/>
                </div>
                <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Number :</label>
                <input className='py-2 rounded-lg p-2' placeholder='Enter Number'/>
                </div>
                <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Password :</label>
                <input className='py-2 rounded-lg p-2' placeholder='Enter Password'/>
                </div>
                <div className='flex flex-col'>
                <label className='text-2xl text-white font-bold'>Confirm Password :</label>
                <input className='py-2 rounded-lg p-2' placeholder='Enter Confirm Password'/>
                </div>
                </div>
                <button className='text-xl p-2 self-center font-bold hover:bg-yellow-400 bg-white w-[200px] py-2 rounded-lg'>
                  Register
                </button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default Register