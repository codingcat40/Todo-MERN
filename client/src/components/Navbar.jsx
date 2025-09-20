import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const {loggedIn, setLoggedIn} = useAuth()
  const navigate = useNavigate();
  
  // check if there is any active session
  useEffect(() => {
    
     axios.get('http://localhost:3001/api/check-session', {withCredentials: true}).then((res) => {
        setLoggedIn(true);
      }).catch((err) => console.log(err))

    
  }, [setLoggedIn])


  const handleLogout = async () => {
      await axios.post('http://localhost:3001/api/user/logout', {}, {withCredentials: true}).then(() => {
        setLoggedIn(false);
        navigate('/');
      }).catch(err => console.log(err));
  }

  return (
    <nav className='bg-white shadow-md fixed w-full top-0 left-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex flex-row items-center justify-between'>
          <img src={Logo} className='h-6 w-6 cursor-pointer'/>

          <ul className='hidden md:flex space-x-6 text-gray-600 font-medium'>
            <Link to='/' className='hover:text-green-600 p-1 cursor-pointer'>Home</Link>
            {
              loggedIn && <>
              <Link to='/todo-items' className='hover:text-green-600 p-1 cursor-pointer'>To-do List</Link>
              <Link to='/notes-items' className='hover:text-green-600 p-1 cursor-pointer'>Notes</Link>
              <button onClick={handleLogout} className='hover:text-red-600 hover:text-lg p-1 cursor-pointer transition-all duration-200 hover:rounded-xl'>Logout</button>
            </>
            }
            
          </ul>
        </div>
    </nav>
  )
}

export default Navbar