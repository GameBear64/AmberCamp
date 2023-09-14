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
});

exports.ParticipantModel = mongoose.model('Participant', participantSchema);
