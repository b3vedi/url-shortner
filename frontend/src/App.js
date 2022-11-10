import { useState } from 'react';
import './App.css';
import axios from "axios"


function App() {
  const [inurl,setInurl] = useState('')
  function handleChange(event){
    setInurl(event.target.value);
    console.log(inurl);
    console.log(event.target.value);
  }
  axios.post("http://localhost/",{"url":inurl})
  return (
    <div 
      style={{
        padding:"10px",
        alignItems:"center",
        margin:"10px"
      }}
    >
      <label htmlFor='inurl'>Please provide the input url</label>
      <input id='inurl' value={inurl} onChange={handleChange}></input>
      <br/>
      <label htmlFor='outurl'>The output url generated is:</label>
      <text id='outurl'>output</text>
    </div>
  );
}

export default App;
