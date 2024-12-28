import React from 'react';
import { BrowserRouter as Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import  Dashboard from '../pages/Dashboard';
import './App.css';


function App() {
  
  return (
    <>
    <nav>
      <a href=''>LogIn</a>
      <br></br>
      <a href=''>SignUp</a>
    </nav>
      <h1>Smartiul</h1>
     <Routes>
      <Route path="/Login" element={< Login/>}/>
      <Route path="/signup" element={< Signup />}/>
      <Route path="/Dashboard" element={< Dashboard />}/>
     </Routes>
    
    </>
  )
}

export default App
