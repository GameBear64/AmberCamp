/**
 * @openapi
 * /user/settings:
 *   patch:
 *     summary: Update user profile
 *     description: Updates the profile information of a user.
 *     tags:
 *       - settings
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               handle:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               email:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 255
 *                 format: email
 *               biography:
 *                 type: string
 *                 maxLength: 256
 *               description:
 *                 type: string
 *               picture:
 *                 type: string
 *               background:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 maxItems: 6
 *               timezone:
 *                 type: string
 *                 enum: [TIME_ZONE_VALUES]
 *               theme:
 *                 type: string
 *                 enum: [THEME_VALUES]
 *               accent:
 *                 type: string
 *                 pattern: ^[0-9A-Fa-f]{6}$
 *               language:
 *                 type: string
 *                 pattern: ^[a-zA-Z]{2}$
 *           description: Updated user settings.
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend request was sent successfully.
 */

const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { TimeZone, Theme, Accent } = require('../../../helpers/enums');

const { allowNoBodyChanges, joiValidate } = require('../../../middleware/validation');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({
    handle: joi.string().min(3).max(30).optional(),
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().min(10).max(255).required().email().optional(),
    biography: joi.string().max(256).optional().allow(''),
    description: joi.string().optional(),
    picture: joi.string().optional(),
    background: joi.string().optional(),
    tags: joi.array().max(6).optional().messages({ 'array.max': 'Only 6 tags allowed!' }),
    timezone: joi.string().valid(...Object.values(TimeZone)),
    theme: joi.string().valid(...Object.values(Theme)),
    accent: joi.string().valid(...Object.values(Accent)),
    language: joi.string().length(2),
  }),
  async (req, res) => {
    await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });
    return res.status(200).json();
  },
];
