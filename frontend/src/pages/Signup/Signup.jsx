import React from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
  import { toast } from 'react-toastify';
  import {useState} from 'react';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const[name, setName] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Signup API

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        { username: name, email, password },
        { withCredentials: true }

      );
      if(response.data.success===false) {
        setError(response.data.message);
        toast.error(response.data.message);
        return;

      }
      toast.success("Signed up successfully");
      setError("");
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed: " + (error.response?.data?.message || error.message));
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 px-4 py-8 md:p-8">
        <div className="w-full max-w-md px-5 py-6 md:px-10 md:py-12 bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-purple-100">
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800">Get Started!</h2>
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-7">Create your account to begin</p>
            
            <input
              type="text"
              placeholder="Name"
              className="input-box "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {Error && <p className="text-xs md:text-sm text-red-500 pb-1">{Error}</p>}

            <button type="submit" className="btn-primary min-h-[48px]">
              Sign Up
            </button>

            <p className="text-xs md:text-sm text-center mt-3 md:mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#2b85ff] underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Decorative Panel - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 items-center justify-center">
        <div className="text-center text-white px-8 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">📝 snapNotes</h1>
          <p className="text-lg lg:text-xl mb-6 lg:mb-8">Organize your thoughts, one note at a time</p>
          <div className="text-6xl lg:text-7xl">🚀</div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
