const { UserModel } = require("../../models/User");
const jwt = require("jsonwebtoken");
const V = require('max-validator');

const createJWTSendCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
};

const filterUserFelids = ({ _id, username }) => ({
  _id,
  username,
});

const validationScheme = {
  handle: 'required|between:3,50|alpha_numeric',
  email: 'required|email',
  password: 'required|min:8|alpha_numeric',
  confirmPassword: 'required',
};

module.exports.post = async (req, res) => {
  let userExists = await UserModel.findOne({ email: req.body.email });
  if (userExists) return res.status(409).send({ user: ["User registered with this email already exists"] });

  let validation = V.validate(req.body, validationScheme)
  if (validation.hasError) return res.status(400).send(validation.errors)

  if (req.body?.confirmPassword !== req.body?.password)
    return res.status(400).send({ confirmPassword: ["Password confirmation does not match password"] });

  let user = await UserModel.create(req.body);
  return res.status(201).send({
    jwt: createJWTSendCookie(user),
    user: filterUserFelids(user),
  });
};
