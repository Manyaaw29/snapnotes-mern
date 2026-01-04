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
        "http://localhost:3000/api/auth/signin",
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
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border border-slate-700 rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl mb-7"> Login </h2>
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
              to={"/signup"}
              className="font-medium text-[#2b85ff] underline"
            >
              {" "}
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
