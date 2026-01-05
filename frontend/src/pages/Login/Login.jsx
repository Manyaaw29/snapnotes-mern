import React from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import {  Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  signinFailure,
  signinStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
 import {  toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Login API
    try {
      dispatch(signinStart());
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Logged in successfully");
      dispatch(signInSuccess(response.data.rest));
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
      console.log(error);
      dispatch(signinFailure(error.response?.data?.message || error.message));
      
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 md:p-8">
        <div className="w-full max-w-md px-5 py-6 md:px-10 md:py-12 bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-blue-100">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800">Welcome Back!</h2>
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-7">Login to access your notes</p>
            
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

            {error && <p className="text-xs md:text-sm text-red-500 pb-1">{error}</p>}

            <button type="submit" className="btn-primary min-h-[48px]">
              Login
            </button>

            <p className="text-xs md:text-sm text-center mt-3 md:mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#2b85ff] underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Decorative Panel - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 items-center justify-center overflow-hidden">
        <div className="text-center text-white px-6 md:px-8 lg:px-12 max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">📝 snapNotes</h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 lg:mb-8">Your personal note-taking companion</p>
          <div className="text-5xl md:text-6xl lg:text-7xl">✍️</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
