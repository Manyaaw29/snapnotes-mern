import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutStart, signoutSuccess, signoutFailure } from "../../redux/user/userSlice";
import axios from "axios";
 import {toast } from 'react-toastify';
const Navbar = ({ userInfo , onSearchNote, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);


  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

const onLogout = async () => {
  try {
    dispatch(signoutStart());

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/signout`,
      { withCredentials: true }
    );

    if (response.data.success === false) {
      dispatch(signoutFailure("Logout failed"));
      toast.error(response.data.message);
      return;
    }
    toast.success("Logged out successfully");
    dispatch(signoutSuccess());
    navigate("/login");
  } catch (error) {
   
    if (error.response && error.response.status === 401) {
      toast.success("Logged out successfully");
      dispatch(signoutSuccess());
      navigate("/login");
    } else {
      toast.error("Logout failed: " + error.message);
      dispatch(signoutFailure(error.message));
    }
  }
};



  return (
    <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-between px-8 py-3 shadow-xl border-b border-blue-800/30 dark:border-gray-700/30 transition-colors duration-300">
      <Link to="/" className="flex items-center gap-3">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/2048px-Paper-notes.svg.png" 
          alt="Logo" 
          className="w-8 h-8"
        />
        <h2 className="text-2xl font-bold text-white py-2 hover:scale-105 transition-transform cursor-pointer">
          <span className="text-blue-400">snap</span>
          <span className="text-white">Notes</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-blue-800/30 dark:hover:bg-gray-700/50 transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
