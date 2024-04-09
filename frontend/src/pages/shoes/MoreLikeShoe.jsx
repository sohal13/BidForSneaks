import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify'

const MoreLikeShoe = ({data}) => {

   const brand = data?.brand
   console.log(brand);
    const [loading , setLoading] =useState(false);
    const [sameshoes , setsameShoes] = useState([]);

    useEffect(()=>{
        const getShoes =async()=>{
            setLoading(true)
            try {
                const res = await axios.get(`/api/shoe/similer/${brand}`)
                const data = res.data;
                if(data.success === false){
                    setLoading(false)
                    console.log(data.message);
                    return toast.error(data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,})
                }
                setLoading(false)
                setsameShoes(data.shoes)
            } catch (error) {
                setLoading(false)
  console.log(error);
  return toast.error(error?.response?.data.message, {position: "top-center", autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "dark",transition: Bounce,});
            }
        }
        getShoes();
    },[brand])

    console.log(sameshoes);
  return (
    <div className='mt-4'>
        <h1 className='p-2 text-xl font-bold '>You May Like</h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4'>
            {sameshoes.map((shoe)=>(
                <div className='bg-blue-700 rounded-md h-100'>
                    <h1 className='p-1 text-sm font-bold text-white'>{shoe.name}</h1>
                    <img src={shoe.imageUrls[0]} className='object-cover md:h-[300px] h-[100px] w-full '/>
                    <h1 className='flex justify-between p-1 text-sm text-white'>Price:₹{shoe.price} <span className='font-bold'>{shoe?.topBid && `TopBid:₹${shoe?.topBid}`}</span> </h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MoreLikeShoe