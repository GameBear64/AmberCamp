const { ParticipantModel } = require('../../../models/Participant');

module.exports.get = [
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (groupMember.groupOwner) return res.status(403).json('Cannot hide groups that you own.');

    await groupMember.updateOne({ hideFromHistory: true });
    return res.status(200).json();
  },
];
