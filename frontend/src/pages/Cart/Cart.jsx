import React from 'react'
import NavBar from '../components/NavBar'
import { userCart } from '../context/cartContectApi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
    
    const {cart,setuserCart} = userCart();

  return (
    <div>
        <NavBar/>
        <div className='max-w-[98%] mx-auto mt-2 font-sans min-h-screen h-full p-2'>
            <h1 className='text-center text-2xl font-bold'>{cart[0] === null && ("Your Cart Is Empty !!") }</h1>
            <div className='flex flex-col w-full'>
                {cart.map((shoes,index)=>(
                    <div key={index} onClick={()=>navigate(`/shoes/${shoes._id}`)} className='p-1 cursor-pointer border rounded border-blue-800 flex flex-col md:flex-row  mt-4 relative justify-between md:w-[800px] self-center w-[300px]'>
                        {console.log(shoes)}
                        <div className='flex flex-col md:flex-row gap-2 p-1'>
                        <img src={shoes?.imageUrls[0]} alt='shoes.img' className='md:w-40 md:h-40 h-[300px] border rounded border-blue-800 object-cover '/>
                        <div className='flex flex-col p-1 justify-between'>
                            <h1 className='text-2xl font-bold'>{shoes?.name}</h1>
                            <h1>{shoes?.description.split(' ').slice(0,5).join(' ') + (shoes?.description?.split(' ').length >5 ? ' ...' : '')}</h1>
                            {shoes.topBid ? (<h1 className='font-bold'>TopBid Price :<span className='text-green-700 text-xl'>₹{shoes.topBid}</span>
                        </h1>) : (<h1 className='font-bold'>Price : <span className='text-green-700 text-xl'>₹{shoes.price}</span></h1>)}
                        </div>
                        </div>
                        <button className='md:mr-10 bg-green-600 px-4 py-2 self-center rounded hover:text-white'>
                            CheckOut | PayMent
                        </button>
                        <button className='absolute top-0 right-0 bg-red-600 py-1 px-4  text-white'>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Cart