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
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

messageSchema.pre('deleteOne', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  await MediaModel.deleteMany({ _id: { $in: doc.flag } });

  next();
});

messageSchema.pre('deleteMany', async function (next) {
  const doc = await this.model.find(this.getQuery());
  const targets = doc.map((doc) => doc.media).reduce((acc, medias) => acc.concat(medias));

  await MediaModel.deleteMany({ _id: { $in: targets } });

  next();
});

exports.MessageModel = mongoose.model('Message', messageSchema);
