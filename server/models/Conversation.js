const mongoose = require('mongoose');
const { ConversationType } = require('../enums.js');
const { MessageModel } = require('./Message.js');
const { ParticipantModel } = require('./Participant.js');

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
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    theme: String, // TODO
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Message',
        },
      ],
      default: [],
      select: false,
    },
  },
  // Update this on every message push to generate user last message
  // if participant.updatedAt < conversation.updatedAt then there are new messages
  { timestamps: true, toJSON: { virtuals: true } }
  // Participant.hideFromHistory is set to true every time user opens the chat
  // Participant.hideFromHistory is ignored if there are new messages
);

conversationSchema.pre('deleteOne', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  await MessageModel.deleteMany({ _id: { $in: doc.messages } });
  await ParticipantModel.deleteMany({ conversation: doc._id });
  // also delete the icon

  next();
});

conversationSchema.pre('save', async function (next) {
  for await (const [i, participant] of this.participants.entries()) {
    await ParticipantModel.create({
      user: participant,
      conversation: this._id,
      // first person in participants array becomes the owner
      groupOwner: i === 0 && this.type === ConversationType.Group,
    });
  }

  next();
});

// before edit hook, to delete participants that are no longer in the chat?????
// before edit hook to create the participants before they join

exports.ConversationModel = mongoose.model('Conversation', conversationSchema);
