const joi = require('joi');
const { UserModel } = require('../../../models/User');

const { joiValidate, InformationTypes } = require('../../../middleware/validation');

module.exports.get = [
  joiValidate({ term: joi.string().required().optional() }, InformationTypes.PARAMS),
  async (req, res) => {
    let result = await UserModel.find({
      $or: [{ handle: { $regex: req.params.term, $options: 'i' } }, { name: { $regex: req.params.term, $options: 'i' } }],
    })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json(result);
  },
];
