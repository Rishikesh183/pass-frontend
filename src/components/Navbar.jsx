import React from 'react'
import { SignedIn, SignedOut, useUser, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className='bg-black text-white flex justify-between p-8  items-center h-[7vh]'>
      <div className="logo font-bold text-2xl"><Link to="/">Password Manager</Link></div>
      <div className='md:block z-10'>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <div className='flex gap-5'>

            <Link to="/sign-up">
              <button className="pt-2 pb-2 px-4 hover:bg-[#29e622] hover:rounded-[10px] text-white cursor-pointer bg-gradient-to-r from-green-700 to-green-500" size="sm">Get Started</button>
            </Link>

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar