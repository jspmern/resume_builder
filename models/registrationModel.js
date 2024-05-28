let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let salt = 10;
let registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "length must be greter than 2"],
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
      validate: {
        validator: function (v) {
          const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!pattern.test(v)) {
            throw new Error("email is invalid");
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          const pattern =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
          if (!(pattern.test(v) && !v.includes(this.name))) {
            throw new Error(
              "password must have one symbol and not included username"
            );
          }
        },
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not supported",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          if (!(v.length == 10)) {
            throw new Error("Number must 10 digit");
          }
        },
      },
    },
    slug: {
      type: String,
    },
    token:{
      type:Array,
      requrie:true
    }
  },
  { timestamps: true }
);
//using middlware for salting the password
registrationSchema.pre("save", async function (next) {
  if (this.password) {
    let hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } else {
    throw new Error("all Field is required *");
  }
});

//this is for the compare password by bcrypt
registrationSchema.methods.comparePassword= async function(row,hash)
{
  let matchPassword= await bcrypt.compare(row,hash)
  return matchPassword
}
//this is for the saving refresh token in db
registrationSchema.methods.addToken=async function(refToken)
{
      await this.updateOne({$push:{token:refToken}})
}


//this is for registaration model
let registration = mongoose.model("regi", registrationSchema);
module.exports = registration;
