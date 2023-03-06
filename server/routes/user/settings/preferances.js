const joi = require('joi');
const { UserModel } = require("../../../models/User");
const { PreferencesModel } = require('../../../models/Preferences')

const { Theme } = require("../../../helpers/enums");

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId }).select('settings').populate('settings');
  if (!user) return res.status(404).send("User not found");

  return res.status(200).send(user.settings);
};

const validationSchema = joi.object({
  theme: joi.string().valid(...Object.values(Theme)),
  accent: joi.string().length(6),
  language: joi.string().length(2)
});

module.exports.patch = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.send(200)

  let validation = validationSchema.validate(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  let user = await UserModel.findOne({ _id: req.apiUserId }).select('settings')
  if (!user) return res.status(404).send("User not found");

  await PreferencesModel.updateOne(
    { _id: user.settings },
    { ...req.body }
  )

  return res.status(200).send();
};