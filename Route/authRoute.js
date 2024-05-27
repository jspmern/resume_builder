let express=require('express')
const { registrationController, loginController, tokenController } = require('../Controller/authController')
const { verifyTokenGenerators } = require('../helper/authtoken')
let route=express.Router()
//registration || POST
route.post('/signup',registrationController)
//login  || POST
route.post('/signin',loginController)
//token || testing
route.get('/token',verifyTokenGenerators,tokenController)
module.exports={authRoute:route}