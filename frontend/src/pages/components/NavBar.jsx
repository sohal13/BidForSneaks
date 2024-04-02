import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Logo from '../../assets/images/logo.png'
import { FaSearch } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextAPI';
import { RiLoginBoxFill } from "react-icons/ri";

const NavBar = () => {

    const { authUser } = useAuth();

    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSearchDropdown(false)
        setShowSidebar(!showSidebar);
    };
    const toggleSearchDropdown = () => {
        setShowSearchDropdown(!showSearchDropdown);
    };

    //handel search my user
    const handelSearch=()=>{

    }
    return (
        <div className={`max-w-[98%] mx-auto mt-2 h-12 shadow-lg font-sans `}>
            <div className='flex justify-between items-center h-full px-2'>
                <div className='flex gap-2 hover:cursor-pointer' onClick={toggleSidebar} >
                    <h1 className='flex bg-blue-800 rounded-md px-1'><FaBarsStaggered color='white' className='font-bold md:text-3xl text-xl' />
                        <span className='hidden md:flex text-2xl font-semibold text-white '>More</span>
                    </h1>
                    <Link to={'/listshoes'}><button className='hidden md:flex bg-blue-800 rounded-md p-[2px] text-xl items-center font-bold font-mono text-white hover:text-orange-500'>Sell Shoes</button></Link>
                </div>
                <div className='mb-5 md:mb-8'>
                    <Link to={'/'}><img src={Logo} alt='logo.png' className='md:w-[300px] md:h-[300px] h-[200px] ' /></Link>
                </div>
                <div className='text-blue-900'>
                    <ul className='flex gap-1 md:text-xl text-md items-center'>
                        {showSearchDropdown ?(<li onClick={toggleSearchDropdown} className='flex justify-center cursor-pointer items-center bg-orange-600 text-white rounded-md p-1'>
                            <ImCancelCircle className='md:xl md' /><span className='hidden md:flex'>Search</span>
                        </li>): (<li onClick={toggleSearchDropdown} className='flex justify-center cursor-pointer items-center bg-blue-800 text-white rounded-md p-1'>
                            <FaSearch className='md:xl md' /><span className='hidden md:flex'>Search</span>
                        </li>)}
                        <Link to={'/cart'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white rounded-md p-1'>
                            <FaShoppingCart className='md:xl md' /><span className='hidden md:flex'>Cart</span>
                        </li>
                        </Link>
                        {!authUser ? (<Link to={'/login'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white  rounded-md p-1'>
                            <RiLoginBoxFill className='md:xl md' /><span className='hidden md:flex'>Login</span>
                        </li>
                        </Link>
                        ) : (
                            <Link to={'/profile'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white  rounded-full p-1'>
                                <img src={authUser?.useris?.photo} className='w-[20px] h-[20px] md:w-[30px] md:h-[30px]' />
                            </li>
                            </Link>
                        )
                        }


                    </ul>
                </div>
            </div>
            {showSidebar && (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-70 '>
                    <div className='absolute left-0 top-0 h-full bg-white text-white w-72 py-4'>
                        {/* Sidebar content goes here */}
                        <div className='flex justify-between items-center px-4'>
                            <h2 className='text-2xl font-bold font-mono text-orange-600'>BidFor<span className='text-blue-800'>Sneaks</span></h2>
                            <button className='text-white' onClick={toggleSidebar}>
                            <ImCancelCircle className='md:text-3xl text-xl text-red-600' />
                            </button>
                        </div>
                       <ul className='p-4 w-full flex flex-col gap-4' onClick={()=>setShowSidebar(false)}>
                       <Link to={'/'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                       Home
                        </li>
                        </Link>
                       <Link to={'/listshoes'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                        Sell Shoes
                        </li>
                        </Link>
                       </ul>
                    </div>
                </div>
            )}
            {showSearchDropdown && (
                <div className='absolute border border-black top-10 md:right-8 right-2 bg-white  rounded-lg shadow-lg w-[95%] z-10   flex mt-4'>
                    <input type='text' placeholder='Search...' className='outline-none p-2 rounded-md w-full' />
                    <button onClick={handelSearch} className='bg-orange-600 text-white  rounded-md px-6 font-bold '><FaSearch className='md:2xl md' /></button>
                </div>
            )}
        </div>
    )
}

export default NavBar