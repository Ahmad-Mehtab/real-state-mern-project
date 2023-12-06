import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <div className='h-screen grid grid-rows-between'>
        <Header />
        <Outlet  />
        <Footer />
    </div>
  )
}

export default Layout