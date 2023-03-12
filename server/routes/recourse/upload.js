const joi = require('joi');
const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');

const validationSchema = joi.object({
  name: joi.required(),
  mimetype: joi.required(),
  data: joi.required(),
});

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    // later i upload to mongo where i use a hook to generate thumnails

    return res.status(200).json('Updated');
  },
];
