const dotenv = require('dotenv')
const mongoose = require('mongoose')
const shortId = require('shortid')
dotenv.config({path:'../.env'})

const shortUrlSchema = new mongoose.Schema({
  full:{
    type:String,
    required: true
  },
  short:{
    type:String,
    required:true,
    default:shortId.generate
  },
  clicks:{
    type:Number,
    default:0
  }
})

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  }
})

module.exports= {ShortUrl:mongoose.model('ShortUrl',shortUrlSchema),User:mongoose.model('User',userSchema)}