/**
 * @swagger
 *
 * /user:
 *   get:
 *     summary: Get the details of the authenticated user.
 *     tags:
 *       - user
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *   delete:
 *     summary: Delete the authenticated user.
 *     tags:
 *       - user
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *             required:
 *               - password
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend request was sent successfully.
 *       400:
 *         description: Bad request. Indicates the request data is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: password must be at least 8 characters
 */

const joi = require('joi');
const { UserModel } = require('../../models/User');
const { joiValidate } = require('../../helpers/middleware');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId });
  if (!user) return res.status(404).json('User not found');
  return res.status(200).json(user);
};

const validationSchema = joi.object({
  password: joi.string().min(8).max(255).required(),
});

module.exports.delete = [
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('+password +settings');

    let validPassword = await user.validatePassword(req.body?.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    await user.deleteOne();

    res.status(200).json();
  },
];
