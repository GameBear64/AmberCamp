const mongoose = require('mongoose');

const mediaChunkSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
});

exports.MediaChunkModel = mongoose.model('MediaChunk', mediaChunkSchema);
