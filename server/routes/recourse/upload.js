const joi = require('joi');
const fs = require('fs').promises;
const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');
const { chunkUnderMeg, typeFromMime } = require('../../helpers/utils');

const { MediaModel } = require('../../models/Media');

const validationSchema = joi.object({
  name: joi.string().required(),
  mimetype: joi.string().required(),
  data: joi.custom(chunkUnderMeg).required(),
  md5: joi.string().required(),
  progress: joi
    .string()
    .regex(/(\d+)-(\d+)-(\d+)/)
    .required(),
});

async function createMasterFile(currentFile, req) {
  if (!currentFile) {
    return await MediaModel.create({
      ...req.body,
      author: req.apiUserId,
    });
  }

  // if the file has a thumbnail, it already exists and we should copy it over to save cpu power
  if (currentFile?.thumbnail) {
    //copy to new master file with new author
    return await MediaModel.create({
      ...req.body,
      author: req.apiUserId,
    });
  }
}

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    let { name, mimetype, data, md5, progress } = req.body;
    let [currentChunk, progressPercentage] = progress.split('-');
    let filetype = typeFromMime(mimetype);
    let userPath = `uploads/${req.apiUserId}`;

    let currentFile = await MediaModel.findOne({ md5 });

    if (currentChunk == 1) currentFile = await createMasterFile(currentFile, req);
    if (!currentFile) return res.status(412).json('Incorrect payload sequence');

    let filePath = `${userPath}/${name}#${md5}.${filetype}`;
    await fs.stat(userPath).catch(async () => await fs.mkdir(userPath));
    fs.appendFile(filePath, data);

    if (progressPercentage == 100) {
      // currentFile.verifyIntegrity();
      // currentFile.generateThumbnail({ small: true });
    }

    return res.status(200).json();
  },
];
