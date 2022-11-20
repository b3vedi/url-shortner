import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from "./Footer";
import axios from "axios";

export default function Login() {
  const[form,setForm] = useState({})
  function handleFormChange(event) {
    const {id,value} = event.target
    setForm((form)=>{
      return{ ...form,[id]:value}
    })
  }
  async function handleSubmit() {
    var result = await axios.post(`${process.env.REACT_APP_URL}login`,{...form})
    localStorage.setItem('__kohly__jwt',result.data)
  }
  return (
    <div>
        <Navbar />
        <div
            style={{flexDirection:"column",backgroundColor:"#353935",margin:"5% 20%",padding:"50px",color:"wheat",fontSize:30,opacity:0.9}}>
            <div className='alignContent' style={{margin:"20px",padding:"10px",justifyContent:"space-around"}}>
                <label htmlFor='username' >Username: </label>
                <input id='username' value={form.username} placeholder={"Enter Username Here"} size={30} onChange={handleFormChange}></input>
            </div>
            <div className='alignContent'style={{margin:"20px",padding:"10px",justifyContent:"space-around"}}>
                <label htmlFor='password' >Password: </label>
                <input type={"password"} placeholder={"Enter Password Here"} id='password' value={form.password} onChange={handleFormChange}></input>
            </div>
        <button className='submit-button' style={{maxWidth:"50%",marginLeft:"20%"}} onClick={handleSubmit}>Submit</button>
        </div>
        <Footer />
    </div>
  )
}
