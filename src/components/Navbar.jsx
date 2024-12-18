import React from 'react'
import Logo from "../assets/Logo.png";   
const Navbar = () => {
  return (
    <div className="navbar bg-surfacea0 items-center flex-col align-middle px-3 py-4">
  <div className="navbar-start ">
  </div>
  <div className="navbar-left">
  <img
    src={Logo}
     alt="Chat Assistant Logo"
    className="w-8 h-8 object-contain mr-2"
            />
             <h1 className="text-xl font-semibold text-white">Danfe Tea</h1>
  </div>


</div>  )
}

export default Navbar;
