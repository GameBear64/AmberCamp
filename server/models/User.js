const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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
      type: String, // TODO: Make it a user array ref later
      default: [],
    },
    sendRequests: {
      type: String, // TODO: Make it a user array ref later
      default: [],
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

userSchema.methods.validatePassword = async (pass) => bcrypt.compare(pass, this.password);

exports.UserModel = mongoose.model('User', userSchema);
