import React, { useState } from 'react'
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from 'axios'

export default function Signup() {
  const[form,setForm] = useState({})
  function handleChange(event) {
    const {id,value} = event.target
    setForm((form) =>{
      return{...form ,[id] : value}
    })
  }
  function handleSubmit() {
    axios.post('/',{...form})
  }
  return (
    <div>
      <Navbar />
      <div
            style={{flexDirection:"column",backgroundColor:"#353935",margin:"5% 20%",padding:"50px",color:"wheat",fontSize:30,opacity:0.9}}>
            <div className='alignContent' style={{margin:"20px",padding:"10px",justifyContent:"space-around"}}>
                <label htmlFor='username' >Username: </label>
                <input id='username' value={form.username} onChange={handleChange}></input>
            </div>
            <div className='alignContent'style={{margin:"20px",padding:"10px",justifyContent:"space-around"}}>
                <label htmlFor='password' >Password: </label>
                <input id='password' type={"password"} placeholder={"Enter Password Here"} value={form.password} onChange={handleChange} ></input>
            </div>
            <div className='alignContent'style={{margin:"20px",padding:"10px",justifyContent:"space-around"}}>
                <label htmlFor='cpass' >Confirm Password: </label>
                <input type={"password"} placeholder={"Enter Password Here"} value={form.cpass} onChange={handleChange} id='cpass'></input>
            </div>
            <button className='submit-button' style={{maxWidth:"70%",marginLeft:"20%"}} onClick={handleSubmit}>Submit</button>
        </div>
      <Footer />
    </div>
  )
}