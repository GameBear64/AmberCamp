const V = require('max-validator');
const { UserModel } = require("../../models/User");
const { createJWTCookie, storedUserFields } = require('../../helpers/utils')

const validationScheme = {
  handle: 'required|between:3,50|alpha_numeric',
  email: 'required|email',
  password: 'required|min:8',
  confirmPassword: 'required',
};

module.exports.post = async (req, res) => {
  let validation = V.validate(req.body, validationScheme)
  if (validation.hasError) return res.status(400).send(validation.errors)

  let userExists = await UserModel.findOne({ email: req.body.email });
  if (userExists) return res.status(409).send({ user: ["User registered with this email already exists"] });

  if (req.body?.confirmPassword !== req.body?.password)
    return res.status(400).send({ confirmPassword: ["Password confirmation does not match password"] });

  let user = await UserModel.create(req.body);
  return res.status(201).send({
    jwt: createJWTCookie(user),
    user: storedUserFields(user),
  });
};
