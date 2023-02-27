const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // profilePicture: { // some time in the future
    //   type: String,
    //   default: null,
    // },
  },
  { timestamps: true }
);

userSchema.pre("create", (next) => {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async (pass) => bcrypt.compare(pass, this.password);

exports.UserModel = mongoose.model('User', userSchema);
