const joi = require('joi');
const fs = require('fs').promises;

const { slugifyField, base64ToBuffer } = require('../../helpers/middleware');
const { chunkUnderMeg, getCode } = require('../../helpers/utils');

const { MediaModel } = require('../../models/Media');

const validationSchema = joi.object({
  name: joi.string().max(240).required(),
  type: joi.string().max(10).regex(/\w+/).required(), // TODO: max should be 255 of combined type + name
  data: joi.custom(chunkUnderMeg).required(),
  md5: joi.string().required(),
  progress: joi
    .string()
    .regex(/(\d+)-(\d+)-(\d+)/)
    .required(),
});

async function createMasterFile(currentFile, userPath, filePath, req) {
  await fs.stat(userPath).catch(async () => {
    await fs.mkdir(userPath);
    await fs.mkdir(`${userPath}/thumbs`);
  });

  const newMedia = {
    ...req.body,
    author: req.apiUserId,
    key: getCode(10),
    path: filePath,
  };

  // file not found - create file
  if (!currentFile) {
    return await MediaModel.create(newMedia);
  }

  // the file exists but it wasn't completed and upload has been attempted again
  if (currentFile && !currentFile?.thumbnail) {
    await currentFile.deleteOne();
    return await MediaModel.create(newMedia);
  }

  // it already exists and we should copy it over to save cpu power
  if (currentFile?.thumbnail) {
    return await MediaModel.create({
      ...currentFile.toObject(),
      author: req.apiUserId,
      key: getCode(10),
    });
  }
}

// remember that you cannot use status returns after this
async function verifyAndThumb(currentFile, filePath, res) {
  if ((await currentFile.verifyIntegrity()) == false) {
    await currentFile.deleteOne();
    await fs.rm(filePath);
    return res.status(500).json('Could not verify');
  }

  currentFile.generateThumbnail();
  return res.status(200).json();
}

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  async (req, res) => {
    let validation = validationSchema.validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    let { name, type, data, md5, progress } = req.body;
    let [currentChunk, progressPercentage] = progress.split('-');
    let userPath = `uploads/${req.apiUserId}`;
    let filePath = `${userPath}/${name}.${type}`;

    let currentFile = await MediaModel.findOne({ md5 });

    if (currentChunk == 1) currentFile = await createMasterFile(currentFile, userPath, filePath, req);
    if (!currentFile) return res.status(412).json('Incorrect payload sequence');
    if (currentChunk > 1 && currentFile?.thumbnail) return res.status(200).json(); // possible when copied

    try {
      await fs.appendFile(filePath, data);
    } catch (error) {
      // if the file is code or executable it will be scanned by the OS's antivirus
      // file is "busy" while it is being scanned
      if (error.code == 'EBUSY') return res.status(406).json('File not trusted');
      return await verifyAndThumb(currentFile, filePath, res);
    }

    if (progressPercentage == 100) return await verifyAndThumb(currentFile, filePath, res);

    return res.status(200).json();
  },
];
