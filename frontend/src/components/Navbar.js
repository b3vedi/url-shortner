import React from 'react'

export default function Navbar() {
  return (
    <nav style={{
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#E27D60",
      color:"purple",
      justifyContent:"center",
    }}><h1 style={{marginRight:"auto",marginLeft:"100px"}}>Welcome to Url shortner</h1>
      <p style={{marginRight:"50px",color:"green"}}>Shorten your urls in one go</p>
    </nav>
  )
}
