import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = (props) => {
  console.log("SearchBar props:", props);
  
  const { value, onChange, handleSearch, onClearSearch } = props;
  
  console.log("value:", value);
  console.log("onChange:", onChange);
  console.log("onClearSearch:", onClearSearch);
  
  return (
    <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md mt-2'>
      <input 
        type="text" 
        placeholder="Search by title, content or tags..." 
        className="w-full text-xs bg-transparent py-[14px] outline-none" 
        value={value || ""} 
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {value && (
        <IoMdClose 
          className='text-slate-400 hover:text-black mr-3 cursor-pointer' 
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass 
        className='text-slate-500 text-xl cursor-pointer hover:text-black mr-3' 
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar