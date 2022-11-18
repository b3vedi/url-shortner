const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')
const ShortUrl = require('./connection')
const app = express()
const path = require('path')
const {URL} = require('url')
require('dotenv').config({path:'./.env'})

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
});


mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.7wofpmp.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true
})

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))

app.listen(port,()=>{
  console.log(`server listening on port ${port}`);
})

// ----------------- deployment ---------------------------

if(process.env.NODE_ENV === "production"){__dirname = path.resolve()
app.use(express.static(path.join(__dirname,'./frontend/build')))
app.get('/',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
})}
// ----------------- deployment ---------------------------

app.post('/',async(req,res)=>{
  const init_url = req.body.inurl
  var out_url = req.body.outurl
  var regex = RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
  if(regex.test(init_url) == false){
    return res.send("invalid Url entered")
  }
  if(out_url == null ) out_url = shortId.generate()
  else out_url = out_url.trim()
  var result = await ShortUrl.findOne({$or:[{full:init_url},{short:out_url}]})
  if(result == undefined){
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
//     (bcrypt.compareSync(password,rows[0].password)) ? res.send(jwt.sign(req.body.username,process.env.JWT_SECRET_KEY)):res.redirect(`${process.env.URL}signup`)
//   })
// })

// app.post('/signup')

app.get('/:shortUrl/analytics',async(req,res)=>{
  const x = req.params.shortUrl
  var result = await ShortUrl.findOne({short:x})
  if(result === undefined) {console.log(result);return res.sendStatus(404)}
  res.send(`${result.clicks}`)
})
