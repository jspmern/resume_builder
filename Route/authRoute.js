let express=require('express')
const { registrationController, loginController, verifyController, logoutController, logoutFromAllDevice } = require('../Controller/authController')
const { verifyToken } = require('../helper/authtoken')
let route=express.Router()
//registration || POST
route.post('/signup',registrationController)
//login  || POST
route.post('/signin',loginController)
//logout || GET
route.get('/logout/:id',logoutController)
//logoutAll || GET
route.get('/logoutAll/:id',logoutFromAllDevice)
//forgetPassword || POST
route.post('/forget-password',forgetPasswordController)
//token || get
route.get('/token',verifyToken,verifyController)
module.exports={authRoute:route}