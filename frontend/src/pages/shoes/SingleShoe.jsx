import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify'
import NavBar from '../components/NavBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import { MdWatchLater } from "react-icons/md";
import { userCart } from '../context/cartContectApi';

const SingleShoe = () => {

    const { id } = useParams()
    const {cart,setuserCart} = userCart();

    const [shoes, setShoes] = useState([]);
    const [shoeImage, setShoeImage] = useState([])
    const [loading, setLoading] = useState(false);
    const [showImg, setShowImage] = useState('');
    
    SwiperCore.use([Navigation])

    useEffect(() => {
        const getShoes = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/api/shoe/${id}`)
                const data = res.data;
                if (data.success === false) {
                    setLoading(false)
                    console.log(data.message);
                    return toast.error(data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, })
                }
                setLoading(false)
                setShoes(data.shoe);
                setShoeImage([data.shoe.imageUrls])
            } catch (error) {
                setLoading(false)
                console.log(error);
                return toast.error(error?.response?.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, });
            }
        }
        getShoes();
    }, [])
    console.log(shoes);
    const showImage = (url) => {
        setShowImage(url)
    }

    //date 
    const dateStr = shoes?.auctionEndDate;
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();

    const currentDate = new Date()
    const formatcurrentDate = currentDate.toLocaleDateString()

    //add to cart funtion
    const handelAddtoCart=(shoes)=>{
        setuserCart([...cart, shoes])
        localStorage.setItem('BidForSneaksCart',JSON.stringify([...cart , shoes]))
        toast.success("Added To Cart" , {
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
    }
    console.log(cart);
    return (
        <div>
            <NavBar />
            <div className='max-w-[98%] mx-auto mt-2 font-sans min-h-screen h-full p-2'>
                <div className={`${loading ? "loading loading-dots w-[100px]" : "hidden"}`}/>
                <div className={`flex gap-4 flex-col md:flex-row ${loading ? "hidden":""}`}>
                    <div className='hidden md:block md:max-w-[180px] min-w-[100px]'>
                        {shoeImage.map((innerArray, outerIndex, index) => (
                            <div key={index} className='grid grid-cols-1 gap-2 my-1 w-full'>
                                {innerArray.map((url, innerIndex) => (
                                    <div key={innerIndex} onClick={() => showImage(url)} className='border rounded border-black hover:shadow-lg hover:shadow-blue-600 cursor-pointer'>
                                        <img key={`${outerIndex}-${innerIndex}`}
                                            src={url}
                                            alt={`Shoe Image ${outerIndex}-${innerIndex}`}
                                            className='w-24 h-24 bg-cover ' />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className=''>
                        <div className='hidden md:block md:w-[400px]'>
                            {shoeImage.map((innerArray, outerIndex) => (
                                <div key={outerIndex} className=' relative flex gap-2 my-1 border border-black rounded justify-center'>
                                    <img src={showImg ? (showImg) : (innerArray[0])} alt="" className='md:h-[400px] w-[400px] h-[300px] object-cover' />
                                    <div className="absolute bottom-0 gap-4 flex">
                                        <button onClick={()=>handelAddtoCart(shoes)} className="bg-blue-500 hover:bg-blue-800 text-white px-8 py-2 rounded flex items-center gap-2">
                                            Add to Cart<FaShoppingCart size={20}/>
                                        </button>
                                        <button className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-2 rounded flex items-center gap-2">
                                            Buy Now<AiFillThunderbolt size={20}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Swiper autoplay={{ delay: 5000 }} navigation className='block md:hidden'>
                            {
                                shoeImage.map((innerArray, outerIndex) => (
                                    <div key={outerIndex} className=''>
                                        {innerArray.map((url, innerIndex) => (
                                            <SwiperSlide key={url}>
                                                <div key={innerIndex} onClick={() => showImage(url)} className='border border-black rounded  w-auto'>
                                                    <img key={`${outerIndex}-${innerIndex}`}
                                                        src={url}
                                                        alt={`Shoe Image ${outerIndex}-${innerIndex}`}
                                                        className=' h-[400px] object-contain' />
                                                </div>
                                            </SwiperSlide>

                                        ))}
                                    </div>
                                ))}
                        </Swiper>
                        <div className="gap-2 flex  md:hidden justify-center">
                                        <button onClick={()=>handelAddtoCart(shoes)} className="bg-blue-500 hover:bg-blue-800 text-white px-8 py-2 rounded flex items-center gap-2">
                                            Add to Cart<FaShoppingCart size={20}/>
                                        </button>
                                        <button className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-2 rounded flex items-center gap-2">
                                            Buy Now<AiFillThunderbolt size={20}/>
                                        </button>
                                    </div>

                    </div>
                    <div className='flex flex-col gap-2 font-bold w-auto'>
                        <h1 className='text-3xl font-bold'>{shoes?.name}</h1>
                        {shoes.topBid ? (<h1 className='font-bold'>TopBid :<span className='text-green-700 text-2xl'>₹{shoes.topBid}</span>
                            <span className='px-4'>Total Bids: <span className='text-xl text-gray-700'>{shoes.allBids.length}</span></span>
                        </h1>) : ("")}
                        <h1 className=''>Price :<span className={`${shoes.topBid ? "line-through text-red-800" : "text-2xl text-green-700"}`}>₹{shoes.price}</span>
                        </h1>
                        <span className='flex items-center'>AuctionEndDate - <MdWatchLater size={22} />{formattedDate}</span>
                        <p>Description : <span className='font-thin text-gray-600 text-sm'>{shoes.description}</span></p>
                        <h1>Size : <span className='rounded-full p-2 py-1 border border-black'>{shoes.size}</span></h1>
                        <h1>Color : {shoes.color}</h1>
                        <h1>Brand : <span className='uppercase '>{shoes.brand}</span></h1>
                    </div>
                </div>
                <div>MoreShoes</div>
            </div>
        </div>
    )
}

export default SingleShoe