const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    nickname: String,
    color: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    lastMessageSeen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    hideFromHistory: {
      type: Boolean,
      default: false,
    },
    // direct conversations have no owners
    groupOwner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

exports.ParticipantModel = mongoose.model('Participant', participantSchema);
