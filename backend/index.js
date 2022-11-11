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
  var shortUrl
  // let myPromise = new Promise((resolve,reject)=>{

  // })
  con.query(`select * from shortUrl where shortUrl="${out_url}"`,(err,rows,fields)=>{
    if(err) throw err;
    console.log(rows);
    if(rows.length == 0) {
      shortUrl = out_url
       con.query(`insert into shortUrl values("${init_url}","${shortUrl}")`,(error,row,field)=>{
        if(error) throw error
      })
    }
    else {(rows[0].fullUrl == init_url)? res.send(process.env.URL+rows[0].shortUrl):res.send("Use someother shortener this is taken")}
  })
})


app.get('/:shortUrl',(req,res)=>{
  const x = req.params.shortUrl
  var fullUrl
  con.query(`select * from shortUrl where shortUrl="${x}"`,(err,rows)=>{
    if(err) throw err
    fullUrl=rows[0].fullUrl
    console.log(fullUrl);
  })
  setTimeout(()=>{},3000)
  console.log(fullUrl);
  if(fullUrl == null) return res.status(404).send()
  res.redirect(fullUrl)
})
