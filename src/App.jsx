import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login, Home } from './pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<Login />}/>
        <Route path="/:typeOfUser"  element={<Home />}/>
        <Route path="/"  element={<Login />}/>
      </Routes>  
      </BrowserRouter>
  )
}

export default App
