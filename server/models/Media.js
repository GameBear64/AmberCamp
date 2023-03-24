const mongoose = require('mongoose');
const sharp = require('sharp');

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
    thumbnail: {
      type: Buffer,
      select: false,
    },
    smallThumbnail: {
      type: Buffer,
      select: false,
    },
    chunks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MediaChunk',
      },
    ],
  },
  { timestamps: true }
);

mediaSchema.methods.generateThumb = async function () {};

// mediaSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     // need a way to get video thumbnails
//     if (this.mimetype.includes('image')) {
//       sharp(this.data)
//         .resize(400, 400, { fit: 'inside' })
//         .toBuffer()
//         .then((tbn) => {
//           this.thumbnail = tbn;
//           return tbn;
//         })
//         .then((buff) => {
//           sharp(buff)
//             .resize(100, 100, { fit: 'inside' })
//             .toBuffer()
//             .then((sTbn) => {
//               this.smallThumbnail = sTbn;
//             });
//         });
//     }
//   }

//   next();
// });

exports.MediaModel = mongoose.model('Media', mediaSchema);
