/**
 * @openapi
 * /user/friend/remove/{id}:
 *   post:
 *     summary: Remove a friend from user's contacts
 *     description: Removes the user with the specified ID as a friend.
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
 *         description: ID of the user to remove from contacts.
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend was removed successfully.
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
 *             example: Can not remove someone not in your contacts
 *       '418':
 *         description: Returns an error message if the user tries to add themselves as a friend.
 *         content:
 *           application/json:
 *             type: string
 *             example: Removing yourself happens at the 'user/delete' route.
 */

const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

const validationSchema = joi.object({
  id: joi.custom(isObjectID),
});

module.exports.post = [
  joiValidate(validationSchema, 'params'),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("Removing yourself happens at the 'user/delete' route.");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
    let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');
    if (!friend) return res.status(404).json('User not found');

    if (!user.contacts.includes(req.params.id)) return res.status(409).json('Can not remove someone not in your contacts');

    if (user.pendingContacts.includes(req.userInSession)) {
      await friend.updateOne({ $pull: { pendingContacts: req.apiUserId } }, { timestamps: false });
    } else {
      //current user
      await user.updateOne({ $pull: { contacts: req.params.id } }, { timestamps: false });
      //user's friend
      await friend.updateOne({ $pull: { contacts: req.apiUserId } }, { timestamps: false });
    }

    return res.status(200).json();
  },
];
