/**
 * @openapi
 * /enums:
 *   get:
 *     summary: Get enum values.
 *     description: |
 *       This endpoint allows you to retrieve enum values. You can specify the 'select' query parameter to get values for a specific enum.
 *     parameters:
 *       - in: query
 *         name: array
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: The name of the specific enum to retrieve values for.
 *     responses:
 *       200:
 *         description: Enum values retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               ["value1", "value2", "value3"]
 */

const joi = require('joi');

const { joiValidate, InformationTypes } = require('../../middleware/validation');
let enums = require('../../enums');

module.exports.get = [
  joiValidate(
    {
      select: joi.string().valid(...Object.keys(enums)),
      array: joi.string(),
    },
    InformationTypes.QUERY
  ),
  async (req, res) => {
    if (req.query?.array !== 'false') {
      enums = Object.fromEntries(Object.entries(enums).map(([title, nums]) => [title, Object.values(nums)]));
    }

    if (req.query?.select) {
      return res.status(200).json(enums[req.query.select]);
    }

    return res.status(200).json(enums);
  },
];
