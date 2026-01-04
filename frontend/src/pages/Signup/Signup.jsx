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
    <div className="flex h-screen">
      
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="w-96 px-10 py-12 bg-white rounded-2xl shadow-2xl border border-purple-100">
          <form onSubmit={handleSignup}>
            <h2 className="text-3xl font-bold mb-2 text-gray-800"> Get Started! </h2>
            <p className="text-gray-600 mb-7">Create your account to begin</p>
            
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

            {Error && <p className="text-sm text-red-500 pb-1"> {Error} </p>}

            <button type="submit" className="btn-primary ">
              {" "}
              Sign Up{" "}
            </button>

            <p className="text-sm text-center mt-4">
              {" "}
              Already have an account? {"  "}
              <Link
                to="/login"
                className="font-medium text-[#2b85ff] underline"
              >
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center text-white px-12">
          <h1 className="text-5xl font-bold mb-4">📝 snapNotes</h1>
          <p className="text-xl mb-8">Organize your thoughts, one note at a time</p>
          <div className="text-7xl">🚀</div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
