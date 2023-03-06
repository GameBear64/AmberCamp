const joi = require('joi');
const { UserModel } = require("../../../models/User");
const { createJWTCookie, storedUserFields } = require('../../../helpers/utils')

const validationSchema = joi.object({
  password: joi.string().min(8).max(255).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  newPassword: joi.string().min(8).max(255).required(),
});

module.exports.post = async (req, res) => {
  let validation = validationSchema.validate(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  let tempUser = await UserModel.findOne({ _id: req.apiUserId }).select('password')
  let validPassword = await tempUser.validatePassword(req.body.password)
  if (!validPassword) return res.status(404).send({ password: ['Incorrect password.'] });

  let user = await UserModel.updateOne(
    { _id: req.apiUserId },
    { $set: { password: req.body.newPassword } }
  )
  if (user.matchedCount == 0) return res.status(404).send("User not found");

  return res.status(200).send({
    jwt: createJWTCookie(user),
    user: storedUserFields(user),
  });
};
