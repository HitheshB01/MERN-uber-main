const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name should be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "last name should be at least 3 characters long"],
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,select:false },
  socketio:{
    type: String
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const user = mongoose.model("user", userSchema);
module.exports = user;