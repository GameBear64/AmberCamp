const mongoose = require('mongoose');
const { MediaModel } = require('./Media');

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    body: {
      type: String,
      required: true,
    },
    media: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Media',
        },
      ],
      default: [],
    },
    reactions: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          emoji: String,
          color: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

messageSchema.pre('deleteOne', { document: true }, async function (next) {
  const target = this._id;
  await MediaModel.deleteMany({ _id: { $in: target } });
  next();
});

// no bulk delete yet
// messageSchema.pre('deleteMany', async function (next) {
//   const doc = await this.model.find(this.getQuery());
//   const targets = doc.map((doc) => doc.media).reduce((acc, medias) => acc.concat(medias));

//   await MediaModel.deleteMany({ _id: { $in: targets } });

//   next();
// });

exports.MessageModel = mongoose.model('Message', messageSchema);
