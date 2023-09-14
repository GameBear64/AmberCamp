const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  name: String,
  icon: {
    type: String,
    ref: 'Media',
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

exports.ConversationModel = mongoose.model('Conversation', conversationSchema);
