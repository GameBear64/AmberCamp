const joi = require('joi');
const throttle = require('express-throttle');
const { UserModel } = require('../../models/User');
const { createJWTCookie } = require('../../utils');
const { joiValidate } = require('../../middleware/validation');

module.exports.post = [
  throttle({ burst: 5, period: '10s' }),
  joiValidate({
    handle: joi.string().min(3).max(50).required(),
    email: joi.string().min(10).max(255).required().email(),
    password: joi.string().min(8).max(255).required(), //TODO: better password security
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
  }),
  async (req, res) => {
    let userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) return res.status(409).json('User with this email already exists');

    let user = await UserModel.create(req.body);
    return res.status(201).json({
      id: user._id,
      jwt: createJWTCookie(user),
      theme: user.theme,
      accent: user.accent,
      language: user.language,
    });
  },
];
