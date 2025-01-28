import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='text-white flex justify-between px-[5%] font-bold items-center fixed shadow-xl shadow-gray-100 w-full min-h-[80px] text-[1.6rem] bg-gray-600 border-b-[5px] border-b-solid border-b-black'>
        <NavLink to="/" className="hover:scale-[102%]">Workout Buddy</NavLink>
        <div className='flex gap-10 text-[1.2rem] justify-center items-center'>
            <NavLink className="hover:underline" to={"/signup"}>Sign Up</NavLink>
            <NavLink  className="hover:underline" to={"/login"}>Log In</NavLink>
        </div>
    </div>
  )
}

export default Navbar;