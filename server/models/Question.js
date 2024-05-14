const mongoose = require('mongoose');
const { QuestionCategory } = require('../helpers/enums.js');

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(QuestionCategory),
      default: QuestionCategory.General,
    },
    anonymous: {
      type: Boolean,
      default: true,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
    seen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    rejected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

exports.QuestionModel = mongoose.model('Question', questionSchema);
