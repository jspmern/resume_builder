const {
  accessTokenGenrator,
  refreshTokenGenrator,
} = require("../helper/authtoken");
const registration = require("../models/registrationModel");
let slugify = require("slugify");
//this is for registration
let registrationController = async (req, res) => {
  let { name, phone, email, password, gender } = req.body;
  if (!name || !phone || !email || !password || !gender) {
    return res.status(500).send({ message: "All fields are required *" });
  } else {
    let result = await new registration({
      slug: slugify(name),
      ...req.body,
    }).save();
    if (result) {
      res.status(201).send({ message: "Successfully Register", user: result });
    } else {
      return res.status(500).send({ message: "All fields are required *" });
    }
  }
};
//this is for the login
let loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .send({ message: "All field is required *", success: false });
    } else {
      let availableUser = await registration.findOne({ email: email });
      if (availableUser) {
        let validUser = await availableUser.comparePassword(
          password,
          availableUser.password
        );
        if (validUser) {
          //acess and refresh
          let accessToken = await accessTokenGenrator(availableUser.id);
          let refreshToken = await refreshTokenGenrator(availableUser.id);
          availableUser.addToken(accessToken);
          res.status(200).send({ access: accessToken, refresh: refreshToken });
        } else {
          res
            .status(500)
            .send({ message: "Either password or email is wrong" });
        }
      } else {
        return res
          .status(200)
          .send({ message: "User is not Registered", success: false });
      }
    }
  } catch (error) {
    next(error);
  }
};
//this is for the logout
let logoutController = async (req, res, next) => {
  try {
    let { id } = req.params;
    let token = req.headers.authorization;
    if (!token || !id)
      return res
        .status(402)
        .send({ message: "Somthing Wrong ,While Logout", success: false });
    let findUser = await registration.findOne({
      _id: id,
      token: { $in: [token] },
    });
    if (!findUser)
      return res
        .status(402)
        .send({ message: "Somthing wrong while logout", success: false });
    let afterDelete = await findUser.removeToken(token);
    res
      .status(200)
      .send({ message: "User is Logout Sucessfully", sucess: true });
  } catch (error) {
    next(error);
  }
};
//this is for logout  from all device
let logoutFromAllDevice = async (req, res, next) => {
  try {
    let { id } = req.params;
    let token = req.headers.authorization;
    if (!token || !id)
      return res
        .status(402)
        .send({ message: "Somthing Wrong ,While Logout", success: false });
    let findUser = await registration.findOne({
      _id: id,
      token: { $in: [token] },
    });
    if (!findUser)
      return res
        .status(402)
        .send({ message: "Somthing wrong while logout", success: false });
    let afterDelete = await findUser.removeAllToken();
    res
      .status(200)
      .send({ message: "User is Logout Sucessfully", sucess: true });
  } catch (error) {
    next(error);
  }
};
//this is for forget Password by 
let verifyController = async (req, res) => {
  res.json({ ok: "done" });
};
module.exports = {
  registrationController,
  loginController,
  verifyController,
  logoutController, 
  logoutFromAllDevice,
};
