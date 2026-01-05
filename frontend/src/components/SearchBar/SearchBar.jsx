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
    <div className='w-full md:w-80 flex items-center px-3 md:px-4 bg-slate-100 rounded-md mt-0 md:mt-2'>
      <input 
        type="text" 
        placeholder="Search notes..." 
        className="w-full text-xs md:text-sm bg-transparent py-3 md:py-[14px] outline-none" 
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
          className='text-slate-400 hover:text-black mr-2 md:mr-3 cursor-pointer text-base transition flex-shrink-0' 
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass 
        className='text-slate-500 text-base cursor-pointer hover:text-black mr-2 md:mr-3 transition flex-shrink-0' 
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar