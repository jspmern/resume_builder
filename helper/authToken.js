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
function verifyToken(req, res, next) {
 try {
     let token = req.headers.authorization;
     if (!token) {
       return res
         .status(401)
         .send({ message: "Unauthrized User", success: false });
     }
     let decode = jwt.verify(token, process.env.ACCESS_KEY);
     req.payload=decode
     if (!decode) res.status(401).send({ message: "Unauthorized User" });
     next();
 } catch (error) {
       if(error.name=="JsonWebTokenError")
        {
            next( new Error('User is Unauthourized'))
        } 
        else
        {
             next(new Error(error.message)) 
        }
 }
}
module.exports = { accessTokenGenrator, refreshTokenGenrator, verifyToken };
