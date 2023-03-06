const joi = require('joi');
const { UserModel } = require("../../models/User");
const { createJWTCookie, storedUserFields } = require('../../helpers/utils')

const validationSchema = joi.object({
  handle: joi.string().min(3).max(50).required(),
  email: joi.string().min(10).max(255).required().email(),
  password: joi.string().min(8).max(255).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

module.exports.post = async (req, res) => {
  let validation = validationSchema.validate(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  let userExists = await UserModel.findOne({ email: req.body.email });
  if (userExists) return res.status(409).send("User registered with this email already exists");

  let user = await UserModel.create(req.body);
  return res.status(201).send({
    jwt: createJWTCookie(user),
    user: storedUserFields(user),
  });
};
