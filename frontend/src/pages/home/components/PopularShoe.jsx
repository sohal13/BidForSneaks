import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const PopularShoe = () => {
    const [shoes , setShoes] = useState([]);
    const [loading , setLoading] =useState(false);

    useEffect(()=>{
        const getShoes =async()=>{
            setLoading(true)
            try {
                const res = await axios.get(`/api/shoe/`)
                const data = res.data;
                if(data.success === false){
                    setLoading(false)
                    console.log(data.message);
                    return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
                }
                setLoading(false)
                setShoes(data.shoes)
            } catch (error) {
                setLoading(false)
  console.log(error);
  return toast.error(error?.response?.data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
            }
        }
        getShoes();
    },[])
  return (
    <div className='max-w-[98%] mx-auto mt-2 font-sans'>
        <h1 className='text-2xl font-bold font-mono p-1'>Popular Shoes</h1>
        {loading ? (<div className="w-full flex justify-center">
            <div className="loading loading-spinner loading-lg items-center"></div>
        </div>):(
     <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-10 justify-center p-2'>
           {shoes.map((shoe)=>(
                <Link to={`/shoes/${shoe._id}`}><div key={shoe._id} className='w-64 bg-blue-900 rounded-lg hover:scale-105'>
                    <h1 className='p-1 text-sm font-bold text-white'>{shoe.name}</h1>
                    <img src={shoe.imageUrls[0]}  alt='shoes.png' className='h-64 w-full object-cover'/>
                    <h1 className='flex justify-between p-1 text-sm text-white'>Price:₹{shoe.price} <span className='font-bold'>{shoe?.topBid && `TopBid:₹${shoe?.topBid}`}</span> </h1>
                </div>
                </Link>
           ))}
        </div>)
}
        </div>
  )
}

export default PopularShoe