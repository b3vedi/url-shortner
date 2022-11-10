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
  function handleSubmit(){
  axios.post("http://localhost/",{"url":inurl})
  }
  return (
    <div 
      style={{
        padding:"10px",
        margin:"10px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around"
      }}
    >
      <label htmlFor='inurl'>Please provide the input url</label>
      <input id='inurl' value={inurl} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
      <label htmlFor='outurl'>The output url generated is:</label>
      <text id='outurl'>output</text>
    </div>
  );
}

export default App;
