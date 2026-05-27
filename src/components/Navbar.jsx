import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import { Briefcase, Search } from "lucide-react"
import userIcon from "../assets/user.svg"
import ProfileDropdown from "./ProfileDropdown"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleProfileSelect = () => {
    navigate("/user")
    setIsProfileMenuOpen(false)
  }

  const handleLogoutSelect = () => {
    // TODO: Implement actual logout logic (clear token, etc.)
    navigate("/")
    setIsProfileMenuOpen(false)
  }

  return (
    <>
      <section className='fixed z-50 bg-white w-full flex justify-between items-center p-3 px-11 border-b border-gray-300 '>
        <Link to="/" ><img src={Logo} alt="logo" className='w-11 h-11 object-contain' /></Link>
        <div className="relative w-full max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
          />
          <input
            type="search"
            placeholder="Search opportunities..."
            className="w-full pl-12 pr-4 h-10 rounded-4xl border border-gray-300 
                   bg-white font-normal
                   focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400
                   transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 
            px-6 h-10 
            border border-blue-400 
            bg-blue-50 
            color
            rounded-full 
            hover:bg-blue-100 
            transition-all duration-200 cursor-pointer"
          >
            <Briefcase size={18} />
            <span>
              For <span className="font-semibold">Business</span>
            </span>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <img src={userIcon} alt="profile" className="w-8 h-8 rounded-full" />
              <span className="hidden md:block font-medium">Divyansh Choudhary</span>
            </button>
            {isProfileMenuOpen && (
              <ProfileDropdown
                className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[999]"
                onProfileSelect={handleProfileSelect}
                onLogoutSelect={handleLogoutSelect}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar