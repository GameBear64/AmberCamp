/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Get a user's information by their unique ID.
 *     tags: [user]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
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
 *           application/json:
 *             schema:
 *               type: string
 *               example: User not found
 *   put:
 *     summary: Update relationship details for a user
 *     tags: [user]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update relationship details
 *     requestBody:
 *       description: Update user relationship details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *               accentColor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns an empty response if the friend request was sent successfully.
 *       400:
 *         description: Bad request. Indicates the request data is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: nickname must be at least 3 characters
 *       404:
 *         description: User not found or could not update
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: User not found
 */

const joi = require('joi');
const { UserModel } = require('../../models/User');

const { joiValidate } = require('../../helpers/middleware');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json('User not found');

  let relationship = await user.getRelationship(req.apiUserId);

  return res.status(200).json({ ...user.toObject(), relationship });
};

const validationSchema = joi.object({
  nickname: joi.string().min(3).max(30),
  notes: joi.array(),
  accentColor: joi.string(),
});

module.exports.post = [
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json('User not found');

    let relationship = await user.getRelationship(req.apiUserId);

    let relStats = await relationship.updateOne({ ...req.body });
    if (relStats.acknowledged == 0) return res.status(404).json('Could not update');

    return res.status(200).json();
  },
];
