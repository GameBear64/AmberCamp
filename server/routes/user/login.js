const joi = require('joi');
const throttle = require('express-throttle');
const { UserModel } = require('../../models/User');
const { createJWTCookie, storedUserFields } = require('../../helpers/utils');

const validationSchema = joi.object({
  email: joi.string().min(10).max(255).required().email(),
  password: joi.string().min(8).max(255).required(),
});

module.exports.post = [
  throttle({ burst: 5, period: '10s' }),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    let userAttempting = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!userAttempting) return res.status(404).json({ user: ['User does not exists'] });

    let validPassword = await userAttempting.validatePassword(req.body?.password);
    if (!validPassword) return res.status(404).json({ password: ['Incorrect password'] });

    return res.status(200).json({
      jwt: createJWTCookie(userAttempting),
      user: storedUserFields(userAttempting),
    });
  },
];
