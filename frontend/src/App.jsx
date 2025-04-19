import { Route, Routes } from "react-router-dom";
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home.jsx";
import axios from "axios";
import { useState } from "react";
import UserContextProvider  from "../context/userContext.jsx";
axios.defaults.withCredentials = true;
function App() { 

  return (
    <>
      <UserContextProvider>
        <Toaster position="bottom-right" reverseOrder={false} toastOptions={{duration: 5000}}/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Home" element={<Home/>}/>
        </Routes>
      </UserContextProvider>
    </>
  
  )
}

export default App
