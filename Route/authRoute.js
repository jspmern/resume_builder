let express=require('express')
const { registrationController, loginController, verifyController, logoutController, logoutFromAllDeviceController, forgetPasswordController, refreshTokenController } = require('../Controller/authController')
const { verifyToken } = require('../middlware/authMiddlware')
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
//refresh-token || POST
route.post('/refresh-token',refreshTokenController)
//token || get
route.get('/token',verifyToken,verifyController)
module.exports={authRoute:route}