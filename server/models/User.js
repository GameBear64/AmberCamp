const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { RelationshipModel } = require('./Relationship');
const { Theme, TimeZone } = require('../enums.js');

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
    description: {
      type: String,
      default: '',
    },
    picture: {
      type: String,
      ref: 'Media',
    },
    background: {
      type: String,
      ref: 'Media',
    },
    tags: {
      type: [String],
      default: [],
    },
    timezone: {
      type: String,
      enum: Object.values(TimeZone),
      default: TimeZone['00:00'],
    },
    pendingContacts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      select: false,
    },
    contacts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      select: false,
    },
    blocked: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      select: false,
    },
    theme: {
      type: String,
      enum: Object.values(Theme),
      default: Theme.Light,
    },
    accent: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
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

userSchema.methods.getRelationship = async function (userId) {
  const excludeSelect = '-__v';

  let relation = await RelationshipModel.findOneAndUpdate(
    { from: userId, to: this._id },
    { $setOnInsert: { from: userId, to: this._id } },
    { upsert: true }
  ).select(excludeSelect);

  // on upsert it returns null so we need to fetch a second time after initial creation
  if (relation == null) return await RelationshipModel.findOne({ from: userId, to: this._id }).select(excludeSelect);

  return relation;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);

    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

exports.UserModel = mongoose.model('User', userSchema);
