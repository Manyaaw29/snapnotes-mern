import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes> 
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
  
      </Routes>
    </BrowserRouter>  
  )
}

export default App
