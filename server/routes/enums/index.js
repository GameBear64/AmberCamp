const joi = require('joi');

const { joiValidate, InformationTypes } = require('../../middleware/validation');
let enums = require('../../helpers/enums');

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
