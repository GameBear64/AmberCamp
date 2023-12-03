/**
 * @openapi
 * /:
 *   get:
 *     summary: Test file to test stuff
 *     description: This is my test file to test server stuff, its usually just a ping
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 */

module.exports.get = (req, res) => {
  res.status(200).json('You are logged in');
};
