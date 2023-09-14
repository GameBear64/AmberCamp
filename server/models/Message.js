const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  reactions: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastMessageSeen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

exports.MessageModel = mongoose.model('Message', messageSchema);
