import ShortenUrl  from "./components/ShortenUrl";
import Login from "./components/Login"
import Signup from "./components/Signup"
import React from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenUrl/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}
