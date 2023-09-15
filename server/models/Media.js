const mongoose = require('mongoose');
const getMD5 = require('spark-md5');
const fs = require('fs').promises;

const ffmpeg = require('ffmpeg-static');
const genThumbnail = require('simple-thumbnail');

const { videoExtensions } = require('../utils');

const mediaSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
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
    thumbnail: String,
    done: {
      type: Boolean,
      default: false,
    },
    track: {
      type: Number,
      default: 0, // 0 - track; 1 - track and increment
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

mediaSchema.pre(/^delete/, { document: true, query: false }, async function (next) {
  const usageCount = await this.constructor.countDocuments({ md5: this.md5 });

  if (usageCount === 1) {
    await fs.rm(this.path);
    if (this?.thumbnail) await fs.rm(this.thumbnail);
  }

  next();
});

exports.MediaModel = mongoose.model('Media', mediaSchema);
