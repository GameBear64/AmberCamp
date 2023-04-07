const mongoose = require('mongoose');
const getMD5 = require('spark-md5');
const fs = require('fs').promises;

const ffmpeg = require('ffmpeg-static');
const genThumbnail = require('simple-thumbnail');
const sharp = require('sharp');

const { videoExtensions, imageExtensions } = require('../helpers/utils');

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
    path: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    thumbnail: String,
    icon: String,
    track: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mediaSchema.methods.verifyIntegrity = async function () {
  const internalMD5 = await fs
    .readFile(this.path)
    .then((file) => getMD5.hash(file.toString('base64')))
    .catch(() => 0);

  return internalMD5 == this.md5;
};

mediaSchema.methods.generateThumbnail = async function () {
  const type = this.path.toString().split('.').pop(); // into virtual
  const thumbFilePath = `uploads/${this.author}/thumbs/${this.md5}-thumb.png`;

  if (videoExtensions.includes(type)) {
    const tempFilePath = `uploads/${this.author}/thumbs/${this.md5}-temp.png`;

    // genning a 300x? so sharp has less to process afterwards, sharp is like a safeguard for too high images
    await genThumbnail(this.path, tempFilePath, '300x?', { path: ffmpeg });
    await sharp(tempFilePath).resize(300, 300, { fit: 'inside' }).toFile(thumbFilePath);
    await fs.rm(tempFilePath);
  }

  if (imageExtensions.includes(type)) {
    await sharp(this.path).resize(300, 300, { fit: 'inside' }).toFile(thumbFilePath);
  }

  // this.thumbnail = thumbFilePath;
};

mediaSchema.methods.generateIcon = async function () {
  let type = this.path.toString().split('.').pop(); // into virtual

  if (imageExtensions.includes(type)) {
    return sharp(this.path).resize(80, 80, { fit: 'inside' }).toFile(`uploads/${this.author}/thumbs/${this.md5}-icon.png`);
  }
};

exports.MediaModel = mongoose.model('Media', mediaSchema);
