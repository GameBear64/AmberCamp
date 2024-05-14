const { UserModel } = require('../../../models/User');

module.exports.get = async (req, res) => {
  const toPopulate = 'accentColor background biography handle name picture';

  const user = await UserModel.findOne({ _id: req.apiUserId })
    .select('pendingContacts contacts blocked')
    .populate({ path: 'pendingContacts', select: toPopulate })
    .populate({ path: 'contacts', select: toPopulate })
    .populate({ path: 'blocked', select: toPopulate });
  const sentOut = await UserModel.find({ pendingContacts: { $in: req.apiUserId } }).select(toPopulate);

  return res.status(200).json({ ...user.toObject(), sentOut });
};
