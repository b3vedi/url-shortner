import {  useState } from 'react';
import axios from "axios"
import Navbar from "./Navbar";
import Footer from "./Footer";


function App() {
  const [inurl,setInurl] = useState('')
  const [outurl,setOuturl] = useState()
  function handleInChange(event){
    setInurl(event.target.value);
  }
  function handleOutChange(event){
    setOuturl(event.target.value)
  }
  function handleSubmit(){
  axios.post(`${process.env.REACT_APP_URL}`,{"inurl":inurl,"outurl":outurl}).then((response)=>
  {document.getElementById('outUrl').innerHTML=response.data;
  document.getElementById('outUrl').href = response.data})}
  return (<>
      <Navbar />
    <div 
      style={{
        padding:"0.625rem",
        margin:"0.625rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        backgroundColor:"#353935",
        color:"wheat",
        fontFamily:"cursive",
        fontSize:23,
        borderRadius:"3.125rem",
        width:"50%"
      }}
    >
      <div
        className='alignContent'
      >
        <label htmlFor='inurl' className='inside' style={{width:"50%"}}>The url which you want to shorten:</label>
        <input id='inurl' className='inside' style={{width:"50%"}} value={inurl} onChange={handleInChange}></input>
      </div>
      <div className='alignContent'>
        <label htmlFor='outurl' className='inside' style={{width:"50%"}}>alias </label>
        <input id='outurl' className='inside' style={{width:"50%"}} value={outurl} onChange={handleOutChange}></input>
      </div>
      <button className='inside submit-button' onClick={handleSubmit}>Submit</button>
      <label className='inside'  htmlFor='outUrl'>The output url generated is:</label>
      <a  href className='inside' id='outUrl' style={{color:"wheat"}}>output</a>
    </div>
    <Footer />
    </>
  );
}

export default App;