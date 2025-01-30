import React from 'react'
import { NavLink } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import useLogout from '../hooks/useLogout.js';

const Navbar = () => {
  const {user} = useAuthContext();
  const {logout} = useLogout();

  return (
    <div className='text-white flex justify-between px-[5%] font-bold items-center fixed z-1 w-full min-h-[80px] text-[1.6rem] bg-gray-600 border-b-[5px] border-b-solid border-b-black'>
        <NavLink to="/" className="hover:scale-[102%]">Workout Buddy</NavLink>
        <div className='flex gap-10 text-[1.2rem] justify-center items-center'>
          {
            user
            ? (
              <>
                <h3 className='underline'>{user.email}</h3>
                <button onClick={logout} className="bg-green-700 hover:bg-green-600 border-[1px] border-solid border-green-900 p-1 rounded text-white">Log Out</button>
              </>
            )
            : (
              <>
                <NavLink className="hover:underline" to={"/signup"}>Sign Up</NavLink>
                <NavLink  className="hover:underline" to={"/login"}>Log In</NavLink>
              </>
            )
          }
        </div>
    </div>
  )
}

export default Navbar;