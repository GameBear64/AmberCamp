const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
  nickname: {
    type: String,
    default: '',
  },
  notes: [String],
  accentColor: {
    type: String,
    default: '',
  },
});

exports.RelationshipModel = mongoose.model('Relationship', relationshipSchema);
