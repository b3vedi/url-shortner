import {  useState } from 'react';
import axios from "axios"


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
  axios.post("http://localhost/",{"inurl":inurl,"outurl":outurl}).then((response)=>
  {document.getElementById('outUrl').innerHTML=response.data;
  document.getElementById('outUrl').href = response.data})}
  return (<>
    <nav style={{
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#E27D60",
      color:"purple",
      justifyContent:"center",
    }}><h1 style={{marginRight:"auto",marginLeft:"100px"}}>Welcome to Url shortner</h1>
      <p style={{marginRight:"50px",color:"green"}}>Shorten your urls in one go</p>
    </nav>
    <div 
      style={{
        padding:"10px",
        margin:"10px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}
    >
      <label htmlFor='inurl' className='inside'>The url which you want to shorten:</label>
      <input id='inurl' className='inside' value={inurl} onChange={handleInChange}></input>
      <label htmlFor='outurl' className='inside'>alias</label>
      <input id='outurl' className='inside' value={outurl} onChange={handleOutChange}></input>
      <button className='inside' onClick={handleSubmit}>Submit</button>
      <label className='inside'  htmlFor='outUrl'>The output url generated is:</label>
      <a  href className='inside' id='outUrl'>output</a>
    </div>
    </>
  );
}

export default App;