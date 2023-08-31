/**
 * @openapi
 * /user/settings/preferences:
 *   get:
 *     summary: Get user settings
 *     description: Returns the current user's settings.
 *     tags:
 *       - settings
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Returns the user's settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 theme:
 *                   type: string
 *                   enum: ['light', 'dark']
 *                 accent:
 *                   type: string
 *                   minLength: 6
 *                   maxLength: 6
 *                 language:
 *                   type: string
 *                   minLength: 2
 *                   maxLength: 2
 *             example:
 *               theme: light
 *               accent: '#00FF00'
 *               language: en
 *   patch:
 *     summary: Update user settings
 *     description: Updates the user's settings with the provided values.
 *     tags:
 *       - settings
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: ['light', 'dark']
 *               accent:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *               language:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend request was sent successfully.
 */

const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { PreferencesModel } = require('../../../models/Preferences');

const { allowNoBodyChanges, joiValidate } = require('../../../helpers/middleware');
const { Theme, TimeZone } = require('../../../helpers/enums');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId }).select('settings').populate('settings');

  return res.status(200).json(user.settings);
};

const validationSchema = joi.object({
  theme: joi.string().valid(...Object.values(Theme)),
  accent: joi.string().length(6),
  language: joi.string().length(2),
  timezone: joi.string().valid(...Object.values(TimeZone)),
});

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('settings');

    await PreferencesModel.updateOne({ _id: user.settings }, { ...req.body });

    return res.status(200).json();
  },
];
