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
    <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 flex items-center justify-between px-8 py-3 shadow-xl border-b border-blue-800/30 transition-colors duration-300">
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
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
