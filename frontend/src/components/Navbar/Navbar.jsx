import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutStart, signoutSuccess, signoutFailure } from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useDarkMode from '../../hooks/useDarkMode';

const Navbar = ({ userInfo , onSearchNote, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl border-b border-blue-800/30 dark:border-gray-700 transition-colors duration-300">
    
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/2048px-Paper-notes.svg.png" 
            alt="Logo" 
            className="w-7 h-7 md:w-8 md:h-8"
          />
          <h2 className="text-xl md:text-2xl font-bold text-white py-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-blue-400 dark:text-blue-300">snap</span>
            <span className="text-white">Notes</span>
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-700 dark:bg-gray-700 hover:bg-slate-600 dark:hover:bg-gray-600 transition-colors text-yellow-300 dark:text-yellow-400"
          >
            {isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
          </button>
        </div>

    
        <div className="hidden md:flex items-center gap-4">
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>

     
        <button 
          className="md:hidden text-white text-2xl p-2 hover:bg-blue-800/50 rounded-lg transition"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-slate-800 dark:bg-gray-800 border-t border-blue-800/30 dark:border-gray-700 px-4 py-4 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <div className="flex items-center justify-between">
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-700 dark:bg-gray-700 hover:bg-slate-600 dark:hover:bg-gray-600 transition-colors text-yellow-300 dark:text-yellow-400"
            >
              {isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
