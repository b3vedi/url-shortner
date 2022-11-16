const express = require('express')
const dotenv = require('dotenv')
const con = require('./connection')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')


dotenv.config({path:'../.env'})
app = express()
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
});

// ----------------- deployment ---------------------------

if(process.env.NODE_ENV === "production"){__dirname = path.resolve()
app.use(express.static(path.join(__dirname,'../frontend/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
})}
// ----------------- deployment ---------------------------


const port = process.env.PORT || 5000

app.listen(port,()=>{
  console.log(`server listening on port ${port}`);
})

app.post('/',(req,res)=>{
  const init_url = req.body.inurl
  var out_url = req.body.outurl
  if(out_url == null) out_url = shortId.generate()
  else out_url = out_url.trim()
  var shortUrl
  con.query(`select * from shortUrl where shortUrl="${out_url}" or fullUrl ="${init_url}"`,(err,rows,fields)=>{
    if(err) throw err;
    if(rows.length == 0) {
      shortUrl = out_url
       con.query(`insert into shortUrl values("${init_url}","${shortUrl}",0)`,(error,row,field)=>{
        if(error) throw error
        else res.send(process.env.URL+out_url)
      })
    }
    else {(rows[0].fullUrl == init_url)? res.send(process.env.URL+rows[0].shortUrl):res.send("Use someother shortener this is taken")}
  })
})

app.post('/login',(req,res) =>{
  let username = req.body.username
  let password = req.body.password
  con.query(`select password from user where username="${username}"`,(err,rows,fields)=>{
    if(err != undefined) throw err
    (bcrypt.compareSync(password,rows[0].password)) ? res.send(jwt.sign(req.body.username,process.env.JWT_SECRET_KEY)):res.send(`${process.env.URL}signup`)
  })
})

app.get('/:shortUrl',(req,res)=>{
  const x = req.params.shortUrl
  var fullUrl
  con.query(`select * from shortUrl where shortUrl="${x}"`,(err,rows)=>{
    if(err) throw err
    if(rows.length == 0) return res.sendStatus(404)
    fullUrl=rows[0].fullUrl
    con.query(`update shortUrl set clicks=${rows[0].clicks+1} where shortUrl="${rows[0].shortUrl}"`)
    res.redirect(fullUrl)
  })
})

app.get('/:shortUrl/analytics',(req,res)=>{
  console.log(req)
  res.send("nikal idhar se")
})
