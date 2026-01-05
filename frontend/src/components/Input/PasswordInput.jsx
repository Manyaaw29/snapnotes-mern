import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({value, onChange,placeholder}) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-4 md:px-5 rounded mb-3 '>
      <input type={isShowPassword ? "text" : "password"} placeholder={placeholder || "Password"} value={value} onChange={onChange} 
      className='w-full text-sm bg-transparent py-3 mr-3 outline-none'
      />

      {isShowPassword ? (
        <FaRegEye 
          size={16} 
          className='text-[#2b85ff] cursor-pointer hover:text-blue-600 transition flex-shrink-0' 
          onClick={() => toggleShowPassword()} 
        />
      ) : (
        <FaRegEyeSlash 
          size={16} 
          className='text-slate-400 cursor-pointer hover:text-slate-600 transition flex-shrink-0' 
          onClick={() => toggleShowPassword()} 
        />
      )}
    </div>
  )
}

export default PasswordInput

