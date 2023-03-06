const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { PreferencesModel } = require('./Preferences');

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
      select: false
    },
    password: {
      type: String,
      select: false
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
    contacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false
    }],
    pendingContacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false
    }],
    settings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preferences",
      select: false
    }
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
}

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.settings = await PreferencesModel.create({});
  }

  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

userSchema.pre(/^delete/, async function (next) {
  const userDocument = await this.model.findOne(this.getQuery()).select('settings');

  await PreferencesModel.deleteOne({ _id: userDocument.settings });

  next();
});

exports.UserModel = mongoose.model('User', userSchema);
