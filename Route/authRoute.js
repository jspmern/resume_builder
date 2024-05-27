let express=require('express')
const { registrationController, loginController } = require('../Controller/authController')
let route=express.Router()
//registration || POST
route.post('/signup',registrationController)
//login  || POST
route.post('/signin',loginController)
module.exports={authRoute:route}