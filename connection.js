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

module.exports= mongoose.model('ShortUrl',shortUrlSchema)