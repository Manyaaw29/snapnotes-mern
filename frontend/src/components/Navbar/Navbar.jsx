import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutStart, signoutSuccess, signoutFailure } from "../../redux/user/userSlice";
import axios from "axios";
 import {toast } from 'react-toastify';
const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

const onLogout = async () => {
  try {
    dispatch(signoutStart());

    const response = await axios.get(
      "http://localhost:3000/api/auth/signout",
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
    toast.error("Logout failed: " + error.message);
    dispatch(signoutFailure(error.message));
    
  }
};



  return (
    <div className="bg-amber-200 flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          <span className="text-slate-800">snap</span>
          <span className="text-slate-600">Notes</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
