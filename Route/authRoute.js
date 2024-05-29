let express=require('express')
const { registrationController, loginController, verifyController, logoutController, logoutFromAllDeviceController, forgetPasswordController } = require('../Controller/authController')
const { verifyToken } = require('../helper/authtoken')
let route=express.Router()
//registration || POST
route.post('/signup',registrationController)
//login  || POST
route.post('/signin',loginController)
//logout || get
route.get('/logout/:id',logoutController)
//alllogout ||get
route.get('/all-logout/:id',logoutFromAllDeviceController)
//forget-password ||  post
route.post('/forget-password',forgetPasswordController)
//token || get
route.get('/token',verifyToken,verifyController)
module.exports={authRoute:route}