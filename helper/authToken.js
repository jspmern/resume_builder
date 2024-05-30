let jwt = require("jsonwebtoken");
function accessTokenGenrator(userId) {
  let secret = process.env.ACCESS_KEY;
  return new Promise((res, rej) => {
    let payload = {};
    let option = {
      expiresIn: "2m",
      issuer: "utsavmaithili@gmail.com",
      audience: userId,
    };
    jwt.sign(payload, secret, option, (err, token) => {
      if (err) {
        rej(err.message);
      }
      res(token);
    });
  });
}
function refreshTokenGenrator(userId) {
  let secret = process.env.REFRESH_KEY;
  return new Promise((res, rej) => {
    let payload = {};
    let option = {
      expiresIn: "1y",
      issuer: "utsavmaithili@gmail.com",
      audience: userId,
    };
    jwt.sign(payload, secret, option, (err, token) => {
      if (err) {
        rej(err.message);
      }
      res(token);
    });
  });
}
function refreshTokenVerify(token) {
  try {
    if (!token)
      return res
        .status(500)
        .send({ message: "somthing wrong !", sucess: false });
        
    let decode = jwt.verify(token, process.env.REFRESH_KEY);
    if (!decode) res.status(401).send({ message: "unauthorized user" });
    return decode;
  } catch (err) {
    if (err.name == "JsonWebTokenError") {
      return res
        .status(500)
        .send({ message: "user is unauthorized", sucess: false });
    } else {
      return res.status(500).send({ message: err.message, sucess: false });
    }
  }
}

module.exports = { accessTokenGenrator, refreshTokenGenrator,refreshTokenVerify };
