let express=require('express')
const { registrationController } = require('../Controller/authController')
let route=express.Router()
route.post('/registration',registrationController)
module.exports={authRoute:route}