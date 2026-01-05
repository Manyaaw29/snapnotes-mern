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
    <div className='w-full md:w-80 flex items-center px-3 md:px-4 bg-slate-100 dark:bg-gray-700 rounded-md mt-0 md:mt-2 border border-transparent dark:border-gray-600'>
      <input 
        type="text" 
        placeholder="Search notes..." 
        className="w-full text-xs md:text-sm bg-transparent dark:text-white dark:placeholder-gray-400 py-3 md:py-[14px] outline-none" 
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
          className='text-slate-400 dark:text-gray-400 hover:text-black dark:hover:text-white mr-2 md:mr-3 cursor-pointer text-lg transition flex-shrink-0' 
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass 
        className='text-slate-500 dark:text-gray-400 text-lg cursor-pointer hover:text-black dark:hover:text-white mr-2 md:mr-3 transition flex-shrink-0' 
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar