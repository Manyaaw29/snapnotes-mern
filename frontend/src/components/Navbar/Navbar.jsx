import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate= useNavigate()
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const onClearSearch = () => {
    setSearchQuery("")
  }

  const onLogout = ()=>{
    navigate("/login")
  }

  return (
    <div className="bg-amber-200 flex items-center justify-between px-6 py-2 drop-shadow">
     <Link to={"/"}>
      <h2 className='text-xl font-medium text-black py-2'> 
        <span className="text-slate-800">snap</span>
        <span className="text-slate-600">Notes</span>
      </h2></Link>

      <SearchBar 
        value={searchQuery} 
        onChange={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo
      onLogout={onLogout}
      />
    </div>
  )
}

export default Navbar