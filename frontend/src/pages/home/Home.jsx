import React from 'react'
import { useAuth } from '../context/ContextAPI';
import NavBar from '../components/NavBar';
import HomeHeader from './components/HomeHeader';
import PopularShoe from './components/PopularShoe';
import Footer from '../components/Footer';

const Home = () => {

  const {authUser} = useAuth();
  return (
    <div>
      <NavBar/>
      <HomeHeader/>
      <PopularShoe/>
      <Footer/>
    </div>
  )
}

export default Home;