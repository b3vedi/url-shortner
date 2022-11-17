const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')
const ShortUrl = require('./connection')
const app = express()
const path = require('path')
require('dotenv').config({path:'/.env'})

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
});

// ----------------- deployment ---------------------------

if(process.env.NODE_ENV === "production"){__dirname = path.resolve()
app.use(express.static(path.join(__dirname,'./frontend/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
})}
// ----------------- deployment ---------------------------

mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.7wofpmp.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true
})

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})


app.post('/',async(req,res)=>{
  const init_url = req.body.inurl
  var out_url = req.body.outurl
  if(out_url == null) out_url = shortId.generate()
  else out_url = out_url.trim()
  var shortUrl
  var result = await ShortUrl.findOne({$or:[{short:out_url},{full:init_url}]})
  if(result == undefined){
    shortUrl = out_url
    await ShortUrl.create({short:out_url,full:init_url})
    res.send(process.env.URL+out_url)
  }
  else (result.full == init_url)?res.send(process.env.URL+result.short):res.send("Use some another shortner this is already taken")
})

app.get('/:shortUrl',async(req,res)=>{
  const x = req.params.shortUrl
  var fullUrl
  var result = await ShortUrl.findOne({short:x})
  if(result == undefined) return res.send(404).send()
  fullUrl = result.full
  result.clicks++
  result.save()
  res.redirect(fullUrl)
})
// const express = require('express')
// const dotenv = require('dotenv')
// const model = require('./connection')
// const shortId = require('shortid')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const path = require('path')
// const mongoose = require('mongoose')



// app.post('/login',(req,res) =>{
//   let username = req.body.username
//   let password = req.body.password
//   con.query(`select password from user where username="${username}"`,(err,rows,fields)=>{
//     if(err != undefined) throw err
//     (bcrypt.compareSync(password,rows[0].password)) ? res.send(jwt.sign(req.body.username,process.env.JWT_SECRET_KEY)):res.send(`${process.env.URL}signup`)
//   })
// })

// app.get('/:shortUrl/analytics',(req,res)=>{
//   console.log(req)
//   res.send("nikal idhar se")
// })
