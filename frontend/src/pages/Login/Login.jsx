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
    <div className="flex h-screen">
      
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-96 px-10 py-12 bg-white rounded-2xl shadow-2xl border border-blue-100">
          <form onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold mb-2 text-gray-800"> Welcome Back! </h2>
            <p className="text-gray-600 mb-7">Login to access your notes</p>
            
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

            {error && <p className="text-sm text-red-500 pb-1"> {error} </p>}

            <button type="submit" className="btn-primary ">
              Login{" "}
            </button>

            <p className="text-sm text-center mt-4">
              {" "}
              Don't have an account ? {"  "}
              <Link
                to="/signup"
                className="font-medium text-[#2b85ff] underline"
              >
                {" "}
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

     
      <div className="w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white px-12">
          <h1 className="text-5xl font-bold mb-4">📝 snapNotes</h1>
          <p className="text-xl mb-8">Your personal note-taking companion</p>
          <div className="text-7xl">✍️</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
