const mongoose = require('mongoose');
const { ConversationType } = require('../enums.js');

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    icon: {
      type: String,
      ref: 'Media',
    },
    type: {
      type: String,
      enum: Object.values(ConversationType),
      default: ConversationType.Direct,
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
  },
  { timestamps: true }
  // Update this on every message push
  // Use to generate user last messages
  // Participant.hideFromHistory is set to true every time user opens the chat
  // Participant.hideFromHistory is ignored if there are new messages
);

exports.ConversationModel = mongoose.model('Conversation', conversationSchema);

// before edit hook, to delete participants that are no longer in the chat?????
// before edit hook to create the participants before they join
