import React from 'react'
import  Navbar from '../Navbar/Navbar.jsx'
import { getInitials } from '../../utils/helper.js'

const ProfileInfo = ({onLogout,userInfo}) => {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-white font-bold bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg border-2 border-white'> 
        {getInitials(userInfo?.username)}
         </div>

         <div className='flex flex-col gap-1.5'>
        <p className='text-sm font-semibold text-white leading-tight'>{userInfo?.username}</p>
         <button className='text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-all w-fit ' onClick={onLogout}>Logout</button>
         </div>
      </div>
    </div>
  )
}

export default ProfileInfo
