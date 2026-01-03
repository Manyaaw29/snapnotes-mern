import React from 'react'
import  Navbar from '../Navbar/Navbar.jsx'
import { getInitials } from '../../utils/helper.js'

const ProfileInfo = ({onLogout,userInfo}) => {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-medium bg-slate-100'> 
        {getInitials(userInfo?.username)}
         </div>

         <div>
        <p className='text-sm font-medium text-red-950'>{userInfo?.username}</p>

         </div>
         <button  className='text-sm bg-red-600 text-white p-1 rounded-md hover:opacity-80' onClick={onLogout}> Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo
