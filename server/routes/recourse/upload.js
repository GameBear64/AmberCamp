const joi = require('joi');
const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');
const { chunkUnderMeg } = require('../../helpers/utils');

const validationSchema = joi.object({
  name: joi.required(),
  mimetype: joi.required(),
  data: joi.required().custom((v, h) => chunkUnderMeg(v, h)),
  md5: joi.required(),
  last: joi.boolean(),
});

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    console.log(req.body.name);
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    // CHUNK SIZE 1MB

    // upon receiving a chunk, create a master file if there is no matching md5 and store the chunk
    // if there is a matching md5 just append another chunk
    // if req.body.last then perform the verify step and update verifiedIntegrity

    // later i upload to mongo where i use a hook to generate thumnails

    return res.status(200).json('Updated');
  },
];
