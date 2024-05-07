const mongoose = require('mongoose');
const { ConversationType } = require('../helpers/enums.js');
const { MessageModel } = require('./Message.js');

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    color: String,
    type: {
      type: String,
      enum: Object.values(ConversationType),
      default: ConversationType.Direct,
    },
    participants: [
      {
        nickname: String,
        color: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
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
  { timestamps: true }
  // Participant.hideFromHistory is set to true every time user opens the chat
  // Participant.hideFromHistory is ignored if there are new messages
);

conversationSchema.pre('deleteOne', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  await MessageModel.deleteMany({ _id: { $in: doc.messages } });
  // also delete the icon

  next();
});

// conversationSchema.pre('save', async function (next) {
//   console.log('this', this);

//   for await (const [i, participant] of this.participants.entries()) {
//     // await ParticipantModel.create({
//     //   user: participant,
//     //   conversation: this._id,
//     //   // first person in participants array becomes the owner
//     //   groupOwner: i === 0 && this.type === ConversationType.Group,
//     // });
//   }

//   next();
// });

// conversationSchema.pre('updateOne', async function (next) {
//   const thisId = this.getQuery()._id;
//   const thisUpdate = this.getUpdate();

//   // i could not think of anything else
//   const pushedUsers = thisUpdate?.$push?.users?.$each || thisUpdate?.$push?.users ? [thisUpdate?.$push?.users] : [];
//   const pulledUsers = thisUpdate?.$pull?.users?.$each || thisUpdate?.$pull?.users ? [thisUpdate?.$pull?.users] : [];

//   if (pushedUsers.length !== 0) {
//     for await (const participant of pushedUsers) {
//       await ParticipantModel.create({
//         user: participant,
//         conversation: thisId,
//       });
//     }
//   }

//   if (pulledUsers.length !== 0) {
//     for await (const participant of pulledUsers) {
//       await ParticipantModel.deleteOne({ user: participant });
//     }
//   }

//   next();
// });

// before edit hook, to delete participants that are no longer in the chat?????
// before edit hook to create the participants before they join

exports.ConversationModel = mongoose.model('Conversation', conversationSchema);
