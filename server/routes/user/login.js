/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with the given email and password.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 255
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *             example:
 *               email: restbook@test.com
 *               password: '123456789'
 *     responses:
 *       '200':
 *         description: Returns a success message and a JWT cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   format: JWT
 *             example:
 *               jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDg1ODU2NzVlYmEyYjgyZTA1NTU4MCIsImlhdCI6MTY4MTM4OTMyMSwiZXhwIjoxNjg5MTY1MzIxfQ.EyhDNqy4dOxOpNeuTVq9x34AhEsdSI6Nd4SzGCiHiVI
 *       400:
 *         description: Bad request. Indicates the request data is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: password must be at least 8 characters
 *       '404':
 *         description: Returns an error message if the user does not exist or the password is incorrect.
 *         content:
 *           application/json:
 *             type: string
 *             example: Incorrect password
 *       429:
 *         description: Too Many Requests, only 5 requests per 10 seconds are allowed
 */

const joi = require('joi');
const throttle = require('express-throttle');
const { UserModel } = require('../../models/User');
const { createJWTCookie } = require('../../utils');
const { joiValidate } = require('../../middleware/validation');

module.exports.post = [
  throttle({ burst: 5, period: '10s' }),
  joiValidate({
    email: joi.string().min(10).max(255).required(),
    password: joi.string().min(8).max(255).required(),
  }),
  async (req, res) => {
    let userAttempting = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!userAttempting) return res.status(404).json('User does not exists');

    let validPassword = await userAttempting.validatePassword(req.body?.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    return res.status(200).json({
      id: userAttempting._id,
      jwt: createJWTCookie(userAttempting),
    });
  },
];
