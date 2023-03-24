const mongoose = require('mongoose');

const mediaChunkSchema = new mongoose.Schema({
  mimetype: String,
  data: {
    type: Buffer,
    required: true,
  },
});

exports.MediaChunkModel = mongoose.model('MediaChunk', mediaChunkSchema);
