const V = require('max-validator');
const { UserModel } = require("../../models/User");
const { createJWTCookie, storedUserFields } = require('../../helpers/utils');

// TODO : switch to https://www.npmjs.com/package/validator
const validationScheme = {
  email: 'required|email',
  password: 'required|min:8'
};

module.exports.post = async (req, res) => {
  let validation = V.validate(req.body, validationScheme)
  if (validation.hasError) return res.status(400).send(validation.errors)

  let userAttempting = await UserModel.findOne({ email: req.body.email });
  if (!userAttempting) return res.status(404).send({ user: ['User does not exists'] });

  let validPassword = await userAttempting.validatePassword(req.body?.password)
  if (!validPassword) return res.status(404).send({ password: ['Incorrect password.'] });
  // TODO: add timeouts for this route

  return res.status(200).send({
    jwt: createJWTCookie(userAttempting.id),
    user: storedUserFields(userAttempting)
  });
};
