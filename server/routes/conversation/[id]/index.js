// Get: fetch participants, details and last 20 messages
// Post: Post message, if [id] is user which whom you havent talked, create conversation
// Patch: update convo settings and or participant
// Delete: Delete.
const throttle = require('express-throttle');
const { ConversationModel } = require('../../../models/Conversation');

module.exports.get = (req, res) => {
  res.status(200).json('hey');
};

module.exports.post = [
  throttle({ burst: 10, period: '5s' }),
  async (req, res) => {
    // check if group
    const group = await ConversationModel.findOne({ id: req.params.id });
    if (group) {
      // add message to group
      return res.status(200);
    }

    // check if DM
    const conversation = await ConversationModel.findOne({ participants: { $all: [req.params.id, req.apiUserId] } });
    if (conversation) {
      // add message to group
      return res.status(200);
    }

    // check if ID is of a person
    // if not, throw error
    // if yes, create DM

    // let user = await UserModel.create(req.body);
    // return res.status(201).json({
    //   jwt: createJWTCookie(user),
    // });
  },
];
// create conversation
// add the 2 participants
// send message to the conversation
