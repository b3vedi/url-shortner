import { useState } from 'react';
import './App.css';
import axios from "axios"


function App() {
  const [inurl,setInurl] = useState('')
  const [outurl,setOuturl] = useState()
  function handleInChange(event){
    setInurl(event.target.value);
    console.log(inurl);
  }
  function handleOutChange(event){
    setOuturl(event.target.value)
    
  }
  function handleSubmit(){
  axios.post("http://localhost/",{"inurl":inurl,"outurl":outurl}).then((response)=>{console.log(response.data);document.getElementById('outUrl').innerHTML=response.data;document.getElementById('outUrl').href = response.data})}
  return (
    <div 
      style={{
        padding:"10px",
        margin:"10px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between"
      }}
    >
      <label htmlFor='inurl' className='inside'>Please provide the input url</label>
      <input id='inurl' className='inside' value={inurl} onChange={handleInChange}></input>
      <label htmlFor='outurl' className='inside'>which output url is expected</label>
      <input id='outurl' className='inside' value={outurl} onChange={handleOutChange}></input>
      <button className='inside' onClick={handleSubmit}>Submit</button>
      <label className='inside'  htmlFor='outUrl'>The output url generated is:</label>
      <a  href className='inside' id='outUrl'>output</a>
    </div>
  );
}

export default App;
