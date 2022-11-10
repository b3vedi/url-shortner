const express = require('express')
const dotenv = require('dotenv')
const sql = require('mysql')
const con = require('./connection')

dotenv.config({path:'../.env'})
app = express()
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
});


const port = process.env.PORT || 5000

app.listen(port,()=>{
  console.log(`server listening on port ${port}`);
})

app.post('/',(req,res)=>{
  const init_url = req.body.url 
  console.log(init_url)
  con.connect() 
  // con.query('select * from user',(data,err)=>{
  //   if (err) throw(err);
  //   console.log(data)
  // })
    res.send('hello welcome to our website')
})
