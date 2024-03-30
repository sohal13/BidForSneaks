import React from 'react'
import { useAuth } from '../context/ContextAPI'
import { Navigate, Outlet } from 'react-router-dom';

export const VerifyIsUserLogin=()=>{
    const {authUser} = useAuth();
    return authUser ? <Outlet/> : <Navigate to={'/login'}/>;
}