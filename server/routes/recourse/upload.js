const joi = require('joi');
const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');
const { chunkUnderMeg } = require('../../helpers/utils');

const { MediaModel } = require('../../models/Media');
const { MediaChunkModel } = require('../../models/MediaChunk');

const validationSchema = joi.object({
  name: joi.string().required(),
  mimetype: joi.string().required(),
  data: joi.custom(chunkUnderMeg).required(),
  md5: joi.string().required(),
  progress: joi
    .string()
    .regex(/(\d+)-(\d+)/)
    .required(),
});

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    let [chunkNumber, progressPercentage] = req.body.progress.split('-');

    let currentFile = await MediaModel.findOne({ md5: req.body.md5 });

    // Since the limit is hardcoded to be 1mb per chunk, 100 chunks 100mb which is the file limit
    if (currentFile?.chunks?.length > 100) {
      await currentFile.deleteOne();
      return res.status(413).json('File too large.');
    }

    if (chunkNumber == 1) {
      // if file inst found, create one
      if (!currentFile) {
        currentFile = await MediaModel.create({
          ...req.body,
          author: req.apiUserId,
        });
      }

      // if the file has a thumbnail, it already exists and we should copy it over to save cpu power
      if (currentFile.thumbnail) {
        //copy to new master file
      }
    } else {
      // if file isnt found, the first request was skipped so we should ignore it
      if (!currentFile) return res.status(412).json('Incorrect payload sequence');

      // If the file has a thumbnail, we are trying to write to an existing finished file, which we shouldn't do
      if (currentFile.thumbnail) return res.status(200).json();
    }

    let chunk = await MediaChunkModel.create(req.body);
    await currentFile.updateOne({ $push: { chunks: chunk } });

    if (progressPercentage == 100) {
      // create thumbnail
    }

    return res.status(200).json();
  },
];
