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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               biography:
 *                 type: string
 *                 maxLength: 256
 *               picture:
 *                 type: string
 *               background:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend request was sent successfully.
 */

const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { TimeZone } = require('../../../enums');

const { allowNoBodyChanges, joiValidate } = require('../../../middleware/validation');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({
    handle: joi.string().min(3).max(30).optional(),
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().min(10).max(255).required().email().optional(),
    biography: joi.string().max(256).optional(),
    description: joi.string().optional(),
    picture: joi.string().optional(),
    background: joi.string().optional(),
    tags: joi.array().max(6).optional().messages({
      'array.max': 'Only 6 tags allowed!',
    }),
    timezone: joi.string().valid(...Object.values(TimeZone)),
  }),
  async (req, res) => {
    await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });
    return res.status(200).json();
  },
];
