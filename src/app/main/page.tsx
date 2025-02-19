"use client"
import React from 'react'
import NavbarAfterLogin from '../components/NavbarAfterLogin'


function MainPage() {
    const username = localStorage.getItem("username")
  return (
    <>
        <nav className="h-[10vh] flex justify-between items-center px-10">
                <h1 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight capitalize">Welcome,{username}</h1> 
        </nav>
        {/* <NavbarAfterLogin/> */}
    </>
  )
}

export default MainPage