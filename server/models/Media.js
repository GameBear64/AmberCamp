const mongoose = require('mongoose');
// const fs = require('fs');

const mediaSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    md5: {
      type: String,
      required: true,
    },
    path: String,
    key: {
      type: String,
      required: true,
    },
    thumbnail: String,
    smallThumbnail: String,
    track: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mediaSchema.methods.generateThumbnail = async function ({ medium = true, small = true }) {};

exports.MediaModel = mongoose.model('Media', mediaSchema);
