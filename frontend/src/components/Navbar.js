import { Link } from "react-router-dom";
import React from 'react'

export default function Navbar() {
  const buttonStyles = {
    color:"white",
    backgroundColor:"purple",
    margin:"20px 10px",
    borderRadius:"10px"
  }
  return (
    <nav style={{
      display:"flex",
      flexDirection:"row",
      backgroundColor:"black",
      // backgroundColor:"#E27D60",
      color:"purple",
      justifyContent:"center",
      maxHeight:"75px"
    }}>
      <Link to={'/'} style={{margin:"0px",padding:"10px",marginRight:"auto"}}>
        <img src='logo192.png' alt='' width={"150 px"} style={{opacity:1}}></img>
      </Link>
      <Link to={'/signup'}>
      <button style={buttonStyles}>Sign Up</button></Link>
      <Link to={'/login'}>
      <button style={buttonStyles}>Login</button>
      </Link>
      <button style={buttonStyles} onClick={()=>{localStorage.removeItem('__kohly__jwt')}}>Logout</button>
    </nav>
  )
}
