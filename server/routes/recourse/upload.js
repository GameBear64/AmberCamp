/**
 * @swagger
 * /recourse/upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file and creates a MediaModel instance if it does not already exist.
 *     tags:
 *       - media
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 240
 *               type:
 *                 type: string
 *                 maxLength: 10
 *               mimetype:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: binary
 *               md5:
 *                 type: string
 *               progress:
 *                 type: string
 *                 pattern: '^\\d+-\\d+-\\d+$'
 *           example:
 *             name: example_file
 *             type: txt
 *             mimetype: text/plain
 *             data: "VGhpcyBpcyBhIHRlc3QgZmlsZQ=="
 *             md5: "05ac0e92b6c70e6ff4af4ea4f3c3d6d4"
 *             progress: "1-50-1"
 *     responses:
 *       '200':
 *         description: Returns an empty response if the file was uploaded successfully.
 *       '201':
 *         description: Returns the key and mimetype of the uploaded resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                   example: hg4ygkt38g2y84g237g7g3igifgjhsdgfilwyh
 *                 mimetype:
 *                   type: string
 *                   example: image/png
 *       '406':
 *         description: Returns an error message if the file is not trusted.
 *         content:
 *           application/json:
 *             type: string
 *             example: File not trusted
 *       '412':
 *         description: Returns an error message if the payload sequence is incorrect.
 *         content:
 *           application/json:
 *             type: string
 *             example: Incorrect payload sequence
 */

const joi = require('joi');
const fs = require('fs').promises;

const { joiValidate } = require('../../middleware/validation');
const { slugifyField, base64ToBuffer } = require('../../middleware/mods');
const { chunkUnderMeg, getCode } = require('../../utils');

const { MediaModel } = require('../../models/Media');

async function createMasterFile(userPath, filePath, req) {
  await fs.stat(userPath).catch(async () => await fs.mkdir(userPath));

  return await MediaModel.create({
    ...req.body,
    author: req.apiUserId,
    key: getCode(process.env.MEDIA_KEY_LEN),
    path: filePath,
  });
}

// remember that you cannot use status returns after this
async function handleCopy(req, res, currentFile, progressPercentage, currentChunk) {
  if (currentChunk == 1) {
    await MediaModel.create({
      ...req.body,
      author: req.apiUserId,
      key: getCode(process.env.MEDIA_KEY_LEN),
      path: currentFile.toObject().path,
      done: true,
    });
  }

  if (progressPercentage == 100) {
    const latestFile = await MediaModel.findOne(
      { md5: currentFile.md5, author: req.apiUserId },
      {},
      { sort: { created_at: -1 } }
    );

    return await verifyAndThumb(latestFile, latestFile.path, res);
  }

  return res.status(200).json();
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

  return res.status(201).json({ key: currentFile.key, mimetype: currentFile.mimetype });
}

module.exports.post = [
  slugifyField('name'),
  base64ToBuffer('data'),
  joiValidate({
    name: joi.string().max(240).required(),
    type: joi.string().max(10).regex(/\w+/).required(), // TODO: max should be 255 of combined type + name
    mimetype: joi.string().required(),
    data: joi.custom(chunkUnderMeg).required(),
    md5: joi.string().required(),
    progress: joi
      .string()
      .regex(/(\d+)-(\d+)-(\d+)/)
      .required(),
  }),
  async (req, res) => {
    let { name, type, data, md5, progress } = req.body;
    let [currentChunk, progressPercentage] = progress.split('-');
    let userPath = `uploads/${req.apiUserId}`;
    let filePath = `${userPath}/${name}.${type}`;

    let currentFile = await MediaModel.findOne({ md5 });

    // if the file is found, it is done and it should only be copied over
    // when file is copied, don't let the user know it is copied by sending a response at the first chunk
    if (currentFile?.done) return handleCopy(req, res, currentFile, progressPercentage, currentChunk);
    if (currentChunk == 1) currentFile = await createMasterFile(userPath, filePath, req);
    if (!currentFile) return res.status(412).json('Incorrect payload sequence');

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
