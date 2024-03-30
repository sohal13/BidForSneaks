import React from 'react'
import { useAuth } from '../context/ContextAPI';
import NavBar from './components/NavBar';

const Home = () => {

  const {authUser} = useAuth();
  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default Home;