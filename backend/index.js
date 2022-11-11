const express = require('express')
const dotenv = require('dotenv')
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
  const init_url = req.body.inurl
  var out_url = req.body.outurl
  con.query(`select * from shortUrl where fullUrl="${init_url}"`,(err,rows,fields)=>{
    if(err) throw err;
    if(rows.length == 0) {
      shortUrl = out_url
       con.query(`insert into shortUrl values("${init_url}","${shortUrl}",0)`,(err,row,field)=>{
        if(err) throw err
      })
    }
    else shortUrl = rows[0].shortUrl
  })
  setTimeout(() =>{res.send(process.env.URL+shortUrl)},3000) 
})


app.get('/:shortUrl',(req,res)=>{
  const x = req.params.shortUrl
  var fullUrl
  con.query(`select * from shortUrl where shortUrl="${x}"`,(err,rows,fields)=>{
    if(err) throw err
    fullUrl = rows[0].fullUrl
  })
  console.log(x);
  setTimeout(() =>{console.log(fullUrl);res.redirect(fullUrl)},3000)
})
