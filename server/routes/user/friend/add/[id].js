/**
 * @openapi
 * /user/friend/add/{id}:
 *   post:
 *     summary: Add a friend
 *     description: Adds the user with the specified ID as a friend.
 *     tags:
 *       - friends
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to add as a friend.
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend request was sent successfully.
 *       '400':
 *         description: Returns an error message if the ID is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: Invalid Id
 *       '404':
 *         description: Returns an error message if the user is not found.
 *         content:
 *           application/json:
 *             type: string
 *             example: User not found
 *       '409':
 *         description: Returns an error message if the users are already friends.
 *         content:
 *           application/json:
 *             type: string
 *             example: Already friends
 *       '418':
 *         description: Returns an error message if the user tries to add themselves as a friend.
 *         content:
 *           application/json:
 *             type: string
 *             example: That's just sad...
 */

const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate, InformationTypes } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

module.exports.post = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("That's just sad...");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
    let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');
    if (!friend) return res.status(404).json('User not found');

    if (user.contacts.includes(req.params.id)) return res.status(409).json('Already friends');

    if (user.pendingContacts.includes(req.params.id)) {
      //current user
      await user.updateOne(
        { $pull: { pendingContacts: req.params.id }, $push: { contacts: req.params.id } },
        { timestamps: false }
      );
      //user's friend
      await friend.updateOne({ $push: { contacts: req.apiUserId } }, { timestamps: false });
    } else {
      let updatedUser = await friend.updateOne({ $push: { pendingContacts: req.apiUserId } }, { timestamps: false });

      if (!updatedUser.acknowledged) return res.status(404).json('User not found');
    }
    return res.status(200).json();
  },
];
