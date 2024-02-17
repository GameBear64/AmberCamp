/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user with the given credentials.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               handle:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 255
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *               confirmPassword:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 255
 *             example:
 *               handle: RestBook
 *               email: restbook@test.com
 *               password: '123456789'
 *               confirmPassword: '123456789'
 *     responses:
 *       '201':
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
 *               jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTc3ZTJjMmUyMTdmNjRjNGQ2N2E3ZTkiLCJpYXQiOjE1MTYyMzkwMjJ9.Mprxv9XyNOBSNpkyT05zIbNpZq75KKrYHvdMn0CaxE0
 *       400:
 *         description: Bad request. Indicates the request data is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: password must be at least 8 characters
 *       409:
 *         description: Returns an error message if the email is already registered.
 *         content:
 *           application/json:
 *             type: string
 *             example: User with this email already exists
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
    handle: joi.string().min(3).max(50).required(),
    email: joi.string().min(10).max(255).required().email(),
    password: joi.string().min(8).max(255).required(), //TODO: better password security
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
  }),
  async (req, res) => {
    let userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) return res.status(409).json('User with this email already exists');

    let user = await UserModel.create(req.body);
    return res.status(201).json({
      id: user._id,
      jwt: createJWTCookie(user),
    });
  },
];
