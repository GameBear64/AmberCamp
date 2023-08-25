/**
 * @swagger
 *
 * /user/settings/resetPassword:
 *   post:
 *     summary: Update user password
 *     description: Update user password and return a new JWT and user information
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
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *               confirmPassword:
 *                 type: string
 *                 const:
 *                   {
 *                     "$data": "newPassword"
 *                   }
 *             required:
 *               - password
 *               - newPassword
 *               - confirmPassword
 *           example:
 *             password: currentPassword123
 *             newPassword: newPassword123
 *             confirmPassword: newPassword123
 *     responses:
 *       200:
 *         description: Success. Returns a new JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *             example:
 *               jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTc3ZTJjMmUyMTdmNjRjNGQ2N2E3ZTkiLCJpYXQiOjE1MTYyMzkwMjJ9.Mprxv9XyNOBSNpkyT05zIbNpZq75KKrYHvdMn0CaxE0
 *       400:
 *         description: Bad request. Indicates the request data is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: password must be at least 8 characters
 */

const joi = require('joi');
const { UserModel } = require('../../../models/User');
const { createJWTCookie } = require('../../../helpers/utils');
const { joiValidate } = require('../../../helpers/middleware');

const validationSchema = joi.object({
  password: joi.string().min(8).max(255).required(),
  newPassword: joi.string().min(8).max(255).required(),
  confirmPassword: joi.string().valid(joi.ref('newPassword')).required(),
});

module.exports.post = [
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('password');

    let validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(400).json('Incorrect password.');

    // weird mongo behavior, need this to trigger the save hook
    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({ jwt: createJWTCookie(user) });
  },
];
