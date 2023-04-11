const joi = require('joi');
const fs = require('fs').promises;

const { slugifyField, base64ToBuffer, joiValidate } = require('../../helpers/middleware');
const { chunkUnderMeg, getCode } = require('../../helpers/utils');

const { MediaModel } = require('../../models/Media');

const postSchema = joi.object({
  name: joi.string().max(240).required(),
  type: joi.string().max(10).regex(/\w+/).required(), // TODO: max should be 255 of combined type + name
  mimetype: joi.string().required(),
  data: joi.custom(chunkUnderMeg).required(),
  md5: joi.string().required(),
  progress: joi
    .string()
    .regex(/(\d+)-(\d+)-(\d+)/)
    .required(),
});

async function createMasterFile(currentFile, userPath, filePath, req) {
  await fs.stat(userPath).catch(async () => await fs.mkdir(userPath));

  const newMedia = {
    ...req.body,
    author: req.apiUserId,
    key: getCode(20),
    path: filePath,
  };

  // file not found - create file
  if (!currentFile) return await MediaModel.create(newMedia);

  // it already exists and we should copy it over to save cpu power
  if (currentFile?.done) {
    return await MediaModel.create({
      ...newMedia,
      path: currentFile.toObject().path,
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

  currentFile.done = true;
  await currentFile.save();

  return res.status(200).json({ id: currentFile._id, key: currentFile.key });
}

// remember that you cannot use status returns after this
async function handleCopied(req, res, progressPercentage, md5) {
  if (progressPercentage == 100) {
    let latestFile = await MediaModel.findOne({ md5, author: req.apiUserId }, {}, { sort: { created_at: -1 } });
    return await verifyAndThumb(latestFile, latestFile.path, res);
  }
  return res.status(200).json();
}

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  joiValidate(postSchema),
  async (req, res) => {
    let { name, type, data, md5, progress } = req.body;
    let [currentChunk, progressPercentage] = progress.split('-');
    let userPath = `uploads/${req.apiUserId}`;
    let filePath = `${userPath}/${name}.${type}`;

    let currentFile = await MediaModel.findOne({ md5 });

    if (currentChunk == 1) currentFile = await createMasterFile(currentFile, userPath, filePath, req);
    if (!currentFile) return res.status(412).json('Incorrect payload sequence');

    // when file is copied, dont let the user know it is copied by sending a response at the first chunk
    if (currentChunk > 1 && currentFile.done) return handleCopied(req, res, progressPercentage, md5);

    try {
      await fs.appendFile(filePath, data);
    } catch (error) {
      // if the file is code or executable it will be scanned by the OS's antivirus making it busy aka used by another
      if (error.code == 'EBUSY') return res.status(406).json('File not trusted');
      await verifyAndThumb(currentFile, filePath, res);
    }

    if (progressPercentage == 100) await verifyAndThumb(currentFile, filePath, res);

    if (!res.finished) return res.json();
  },
];
