let dbConnection = require("./config/db");
let dotenv = require("dotenv");
let express = require("express");
const { authRoute } = require("./Route/authRoute");
let app = express();
let PORT = process.env.PORT || 8000;
app.use(express.json());
//middlware configration
dotenv.config({});
dbConnection();

//for setting form data into req
app.use(express.urlencoded({ extended: true }));
//this is for the no route found match
// app.use(async(req,res,next)=>{
//     const error=new Error('Not Found')
//     error.status=404
//     next(error)
// })
//route
app.use("/auth/v1", authRoute);
//this is error level middlware
app.use((err, req, res, next) => {
    console.log('hello error')
  if (err) {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`backend is connected : http://127.0.0.1:${PORT}`);
});
