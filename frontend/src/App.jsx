import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'  
 import { ToastContainer, toast } from 'react-toastify';


const App = () => {
 
  return (
    <BrowserRouter>
  
      <Routes> 
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
  
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>  
  )
}

export default App
