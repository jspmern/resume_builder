let dbConnection=require('./config/db')
let dotenv=require('dotenv')
//middlware configration
dotenv.config({})
//database Connection
dbConnection()
