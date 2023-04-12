const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { createJWTCookie, storedUserFields } = require('../../../helpers/utils');
const { joiValidate } = require('../../../helpers/middleware');

const validationSchema = joi.object({
  password: joi.string().min(8).max(255).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  newPassword: joi.string().min(8).max(255).required(),
});

module.exports.post = [
  joiValidate(validationSchema),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('password');
    if (user.matchedCount == 0) return res.status(404).json('User not found');

    let validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(404).json({ password: ['Incorrect password.'] });

    // weird mongo behavior, need this to trigger the save hook
    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({
      jwt: createJWTCookie(user),
      user: storedUserFields(user),
    });
  },
];
