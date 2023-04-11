const mongoose = require('mongoose');
const getMD5 = require('spark-md5');
const fs = require('fs').promises;

const ffmpeg = require('ffmpeg-static');
const genThumbnail = require('simple-thumbnail');

const { videoExtensions } = require('../helpers/utils');

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
    mimetype: {
      type: String,
      required: true,
    },
    md5: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    thumbnail: String,
    done: {
      type: Boolean,
      default: false,
    },
    track: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

mediaSchema.virtual('type').get(function () {
  return this.path.toString().split('.').pop();
});

mediaSchema.methods.verifyIntegrity = async function () {
  const internalMD5 = await fs
    .readFile(this.path)
    .then((file) => getMD5.hash(file.toString('base64')))
    .catch(() => 0);

  return internalMD5 == this.md5;
};

mediaSchema.pre('save', async function (next) {
  if (this.done && videoExtensions.includes(this.type)) {
    const thumbFilePath = `uploads/${this.author}/${this.md5}.png`;
    await genThumbnail(this.path, thumbFilePath, '500x?', { path: ffmpeg });

    this.thumbnail = thumbFilePath;
  }
  next();
});

exports.MediaModel = mongoose.model('Media', mediaSchema);
