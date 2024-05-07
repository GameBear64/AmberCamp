const joi = require('joi');
const throttle = require('express-throttle');
const { UserModel } = require('../../models/User');
const { createJWTCookie } = require('../../utils');
const { joiValidate } = require('../../middleware/validation');

module.exports.post = [
  throttle({ burst: 5, period: '10s' }),
  joiValidate({
    email: joi.string().min(10).max(255).required(),
    password: joi.string().min(8).max(255).required(),
  }),
  async (req, res) => {
    let userAttempting = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!userAttempting) return res.status(404).json('User does not exists');

    let validPassword = await userAttempting.validatePassword(req.body?.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    return res.status(200).json({
      id: userAttempting._id,
      jwt: createJWTCookie(userAttempting),
      theme: userAttempting.theme,
      accent: userAttempting.accent,
      language: userAttempting.language,
    });
  },
];
