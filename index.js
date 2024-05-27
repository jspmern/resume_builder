let dbConnection=require('./config/db')
let dotenv=require('dotenv')
let express=require('express')
const {authRoute} = require('./Route/authRoute')
let app=express()
let PORT=process.env.PORT || 8000
app.use(express.json())
//middlware configration
dotenv.config({})
dbConnection()

//for setting form data into req
//app.use(express.urlencoded({extended:true}))
//route
app.use('/auth/v1',authRoute)
app.listen(PORT,()=>{
    console.log(`backend is connected : http://127.0.0.1:${PORT}`)
})
