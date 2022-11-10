const dotenv = require('dotenv')
const sql = require('mysql')


dotenv.config({path:'../.env'})

const connection = sql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
      database: process.env.DB_NAME,
      password: process.env.PASSWORD
  })


module.exports= connection