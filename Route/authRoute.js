let express=require('express')
const { registrationController, loginController, verifyController } = require('../Controller/authController')
const { verifyToken } = require('../helper/authtoken')
let route=express.Router()
//registration || POST
route.post('/signup',registrationController)
//login  || POST
route.post('/signin',loginController)
//token || get
route.get('/token',verifyToken,verifyController)
module.exports={authRoute:route}