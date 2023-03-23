const joi = require('joi');
const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');
const { chunkUnderMeg } = require('../../helpers/utils');

const validationSchema = joi.object({
  name: joi.string().required(),
  mimetype: joi.string().required(),
  data: joi.custom(chunkUnderMeg).required(),
  md5: joi.string().required(),
  progress: joi.number().required(),
});

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    console.log(req.body.name);
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    // CHUNK SIZE 1MB

    // upon receiving a chunk, check if a md5 file exists
    // if yes copy ignore the incoming chunks, create a master file and point to the same chunks (to save space)
    // if no create a master file store the chunk
    // if there is a matching md5 just append another chunk
    // if req.body.last then perform the verify step and update verifiedIntegrity

    // later i upload to mongo where i use a hook to generate thumnails

    setTimeout(() => {
      console.log('Delayed for 1 second.');
      return res.status(200).json('Updated');
    }, 1000);
  },
];
