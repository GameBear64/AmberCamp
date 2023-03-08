const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { PreferencesModel } = require('./Preferences');
const { RelationshipModel } = require('./Relationship');

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
      select: false,
    },
    password: {
      type: String,
      select: false,
    },
    biography: {
      type: String,
      default: '',
    },
    picture: {
      type: String, // TODO: Make it a picture ref later
    },
    background: {
      type: String, // TODO: Make it a picture ref later
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select: false,
      },
    ],
    pendingContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select: false,
      },
    ],
    settings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preferences',
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    // passwordResetToken: String,
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.getRelationship = async function (myId) {
  const excludeSelect = '-__v';

  let relation = await RelationshipModel.findOneAndUpdate(
    { from: myId, to: this._id },
    { $setOnInsert: { from: myId, to: this._id } },
    { upsert: true }
  ).select(excludeSelect);

  // on upsert it returns null so we need to fetch a second time after initial creation
  if (relation == null) return await RelationshipModel.findOne({ from: myId, to: this._id }).select(excludeSelect);

  return relation;
};

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.settings = await PreferencesModel.create({});
  }

  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);

    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

userSchema.pre(/^delete/, async function (next) {
  //TODO: try select like this
  // this.select('settings')
  const userDocument = await this.model.findOne(this.getQuery()).select('settings');
  await PreferencesModel.deleteOne({ _id: userDocument.settings });

  next();
});

exports.UserModel = mongoose.model('User', userSchema);
