import React, { useState } from 'react'
import useLogin from '../hooks/useLogin.js';
import useAuthContext from '../hooks/useAuthContext.js';

const Login = () => {
  const {user} = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, loading, error} = useLogin(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    }
    catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleLogin} className='rounded text-xl min-w-[400px] min-h-[400px] absolute top-[20%] left-[50%] translate-x-[-50%] shadow-2xl border-black border-[1px] border-solid items-center flex flex-col gap-10 p-3 bg-gray-500 text-white'>
      <h3 className='text-2xl font-bold text-green-500'>Log In</h3>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col justify-center'>
          <label>Email:</label>
          <input className='bg-white rounded p-1 text-black' onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" name="email" />
        </div>

        <div className='flex flex-col justify-center'>
          <label>Password:</label>
          <input className='bg-white rounded p-1 text-black' onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" name="password" />
        </div>
      </div>

      <button disabled={loading} className='bg-green-600 hover:cursor-pointer hover:bg-green-500 rounded w-[50%] flex justify-center items-center border-green-800 border-solid border-[1px] p-1' type='submit'>Log In</button>
      {
        error &&
        <div className='border-[1px] border-solid border-red-600 p-1 text-red-600 bg-white'>{error}</div>
      }
    </form>
  )
}

export default Login;