const express = require('express')
const dotenv = require('dotenv')
const con = require('./connection')
const shortId = require('shortid')

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
  if(out_url == null) out_url = shortId.generate()
  var shortUrl
  con.query(`select * from shortUrl where shortUrl="${out_url}" or fullUrl ="${init_url}"`,(err,rows,fields)=>{
    if(err) throw err;
    if(rows.length == 0) {
      shortUrl = out_url
       con.query(`insert into shortUrl values("${init_url}","${shortUrl}")`,(error,row,field)=>{
        if(error) throw error
        else res.send(process.env.URL+out_url)
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
    if(rows.length == 0) return res.sendStatus(404)
    fullUrl=rows[0].fullUrl
    res.redirect(fullUrl)
  })
})
