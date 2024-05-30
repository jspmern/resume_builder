let jwt=require('jsonwebtoken')
function verifyToken(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
          return res
            .status(401)
            .send({ message: "Unauthrized User", success: false });

        }
        
        let decode = jwt.verify(token, process.env.ACCESS_KEY);
      
        req.payload=decode.aud
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
   module.exports={verifyToken}