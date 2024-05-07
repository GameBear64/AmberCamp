const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { TimeZone, Theme, Accent } = require('../../../helpers/enums');

const { allowNoBodyChanges, joiValidate } = require('../../../middleware/validation');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({
    handle: joi.string().min(3).max(30).optional(),
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().min(10).max(255).required().email().optional(),
    biography: joi.string().max(256).optional().allow(''),
    description: joi.string().optional(),
    picture: joi.string().optional(),
    background: joi.string().optional(),
    tags: joi.array().max(6).optional().messages({ 'array.max': 'Only 6 tags allowed!' }),
    timezone: joi.string().valid(...Object.values(TimeZone)),
    theme: joi.string().valid(...Object.values(Theme)),
    accent: joi.string().valid(...Object.values(Accent)),
    language: joi.string().length(2),
  }),
  async (req, res) => {
    await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });
    return res.status(200).json();
  },
];
