import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Logo from '../../assets/images/logo.png'
import { FaSearch } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextAPI';
import { RiLoginBoxFill } from "react-icons/ri";

const NavBar = () => {

    const { authUser } = useAuth();
    return (
        <div className='max-w-[98%] mx-auto mt-2 h-12 shadow-lg font-sans'>
            <div className='flex justify-between items-center h-full px-2'>
                <div className='flex gap-2'>
                    <h1 className='flex bg-blue-800 rounded-md px-1'><FaBarsStaggered color='white' className='font-bold md:text-3xl text-xl' />
                        <span className='hidden md:flex text-2xl font-semibold text-white '>More</span>
                    </h1>
                    <Link to={'/listshoes'}><button className='hidden md:flex bg-blue-800 rounded-md p-[2px] text-xl items-center font-bold font-mono text-white hover:text-orange-500'>Sell Shoes</button></Link>
                </div>
                <div className='mb-5 md:mb-8'>
                    <img src={Logo} alt='logo.png' className='md:w-[300px] md:h-[300px] h-[200px] ' />
                </div>
                <div className='text-blue-900'>
                    <ul className='flex gap-1 md:text-xl text-md items-center'>
                        <Link to={'/search'}><li className='flex justify-center cursor-pointer items-center bg-blue-800 text-white rounded-md p-1'>
                            <FaSearch className='md:xl md' /><span className='hidden md:flex'>Search</span>
                        </li>
                        </Link>
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
        </div>
    )
}

export default NavBar