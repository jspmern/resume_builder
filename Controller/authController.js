const {
  accessTokenGenrator,
  refreshTokenGenrator,
} = require("../helper/authtoken");
const registration = require("../models/registrationModel");
let slugify = require("slugify");

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
let loginController = async (req, res) => {
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
                availableUser.addToken(accessToken)
        res.status(200).send({ access: accessToken, refresh: refreshToken });
      } else {
        res.status(500).send({ message: "Either password or email is wrong" });
      }
    } else {
      return res
        .status(200)
        .send({ message: "User is not Registered", success: false });
    }
  }
};
let verifyController=async(req,res)=>{
    res.json({ok:"done"})
}
module.exports = { registrationController, loginController,verifyController };
