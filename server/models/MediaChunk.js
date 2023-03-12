const mongoose = require('mongoose');

const mediaChunkSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  data: {
    type: Buffer,
    required: true,
  },
});

exports.MediaChunkModel = mongoose.model('MediaChunk', mediaChunkSchema);
