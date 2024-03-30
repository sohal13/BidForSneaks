import React from 'react'
import sneakimg from '../../../assets/images/sneak1.png'
import { FaArrowDown } from "react-icons/fa";

const HomeHeader = () => {
  return (
    <div className='max-w-[98%] mx-auto mt-2 font-sans bg-blue-900'>
        <div className='flex flex-col md:flex-row justify-around items-center w-full'>
            <div className="text-white">
                <h1 className='md:text-3xl text-2xl font-bold'>Welcome To <br/>
                <span className='md:text-6xl text-4xl font-semibold font-mono text-orange-600'>BidForSneaks</span><br/>
                your one sport place to <br/>
                make your favourit<br/>
                collection</h1>
                <button className='bg-orange-600 px-6 text-xl mt-4 font-bold font-mono flex items-center gap-1 shadow-slate-50 shadow-sm'>
                    Explore<FaArrowDown />
                    </button>
            </div>
            <div className="">
            <img src={sneakimg} alt='image.png' className="md:w-[500px] w-[300px]"/>
            </div>
        </div>
    </div>
  )
}

export default HomeHeader