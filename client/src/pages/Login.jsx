import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  }



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>

      <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
        <h2 className='text-2xl font-bold text-center text-black mb-6'>Login to your account</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'
          className='w-full px-6 py-2 border rounded-lg focus:outline-none'
          required/>

          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'
          className='w-full px-6 py-2 border rounded-lg focus:outline-none'
          required
          />

          <button type='submit' className='cursor-pointer w-full bg-black text-white py-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-green-800'>Login</button>
          
         
        </form>

         <p className="text-sm text-gray-600 mt-4 text-center">
            Want to Register?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-black font-semibold hover:underline"
            >
              Sign Up
            </span>
          </p>
      </div>
    </div>
  )
}

export default Login