import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white flex justify-between p-8  items-center h-[7vh]'>
        <div className="logo font-bold text-2xl">Password Manager</div>
        <ul className='font-bold '>
           {/* <a href="#"> <li className=''>Passwords</li></a> */}
        </ul>
    </nav>
  )
}

export default Navbar