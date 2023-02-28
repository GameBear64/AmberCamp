const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { Theme } = require("../helpers/enums.js");

const userSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
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
      trim: true,
    },
    biography: {
      type: String,
      default: '',
    },
    picture: {
      type: String, // TODO: Make it a picture ref later
      default: '',
    },
    background: {
      type: String, // TODO: Make it a picture ref later
      default: '',
    },
    contacts: {
      type: Array, // TODO: Make it a user array ref later
      default: [],
    },
    sendRequests: {
      type: Array, // TODO: Make it a user array ref later
      default: [],
    },
    theme: {
      type: String,
      enum: Object.values(Theme),
      default: Theme.Light
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

userSchema.methods.validatePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
}

exports.UserModel = mongoose.model('User', userSchema);
