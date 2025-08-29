import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useState } from 'react'

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);


  return (
    <nav className='bg-white shadow-md fixed w-full top-0 left-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex flex-row items-center justify-between'>
          <img src={Logo} className='h-6 w-6 cursor-pointer'/>

          <ul className='hidden md:flex space-x-6 text-gray-600 font-medium'>
            <Link to='/' className='hover:text-green-600 cursor-pointer'>Home</Link>
            {
              loggedIn && <>
              <Link to='/todo-items' className='hover:text-green-600 cursor-pointer'>To-do List</Link>
              <Link to='/notes-items' className='hover:text-green-600 cursor-pointer'>Notes</Link>
            </> 
            }
            
          </ul>
        </div>
    </nav>
  )
}

export default Navbar