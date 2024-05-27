let jwt = require("jsonwebtoken");
async function accessTokenGenerators(userId) {
  return new Promise((res, rej) => {
    const payload = {};
    let secret = process.env.ACCESS_KEY;
    const option = {
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
function refreshTokenGenerators(userId) {
  return new Promise((res, rej) => {
    const payload = {};
    let secret = process.env.REFRESH_KEY;
    const option = {
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
async function verifyTokenGenerators(req, res, next) {
 try {
     let token = req.headers.authorization;
     let decode = jwt.verify(token, process.env.ACCESS_KEY);
     req.payload = decode;
     if (!decode) {
       res.status(200).send({ message: "Unauthorized User" });
     }
     next();
 } catch (error) {
      if(error.name=="JsonWebTokenError")
        {
            throw new Error('User is Unauthrized')
        }  
        else{
            throw new Error(error.message)
        }
 }
}

module.exports = {
  accessTokenGenerators,
  refreshTokenGenerators,
  verifyTokenGenerators,
};
