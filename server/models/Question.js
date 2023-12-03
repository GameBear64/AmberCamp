const mongoose = require('mongoose');
const { QuestionCategory } = require('../enums.js');

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(QuestionCategory),
      default: QuestionCategory.General,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
    // users: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
    // ],
    // theme: String, // TODO
    // messages: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Message',
    //     },
    //   ],
    //   default: [],
    //   select: false,
    // },
  },
  // Update this on every message push to generate user last message
  // if participant.updatedAt < conversation.updatedAt then there are new messages
  { timestamps: true, toJSON: { virtuals: true } }
);

exports.QuestionModel = mongoose.model('Question', questionSchema);
