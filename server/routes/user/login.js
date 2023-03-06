const joi = require('joi');
const { UserModel } = require("../../models/User");
const { createJWTCookie, storedUserFields } = require('../../helpers/utils');

const validationSchema = joi.object({
  email: joi.string().min(10).max(255).required().email(),
  password: joi.string().min(8).max(255).required(),
});

module.exports.post = async (req, res) => {
  let validation = validationSchema.validate(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  let userAttempting = await UserModel.findOne({ email: req.body.email });
  if (!userAttempting) return res.status(404).send({ user: ['User does not exists'] });

  let validPassword = await userAttempting.validatePassword(req.body?.password)
  if (!validPassword) return res.status(404).send({ password: ['Incorrect password'] });
  // TODO: add timeouts for this route

  // TODO: generate tag for the clients device 
  // same on register 

  return res.status(200).send({
    jwt: createJWTCookie(userAttempting),
    user: storedUserFields(userAttempting)
  });
};
