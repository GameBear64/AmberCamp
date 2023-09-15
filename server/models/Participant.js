const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  nickname: String,
  color: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastMessageSeen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  hideFromHistory: Boolean,
  groupOwner: Boolean, // Ignored if group type == direct
});

exports.ParticipantModel = mongoose.model('Participant', participantSchema);
