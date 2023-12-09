import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {
 const {userData} =  useSelector((state)=> state.user);
  return userData ? <Outlet class="bg-slate-200" />: <Navigate to="/signin" />
  
}

export default PrivateRouter