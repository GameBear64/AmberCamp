/**
 * @swagger
 * /resource/{key}:
 *   get:
 *     summary: Get a media file by key
 *     description: Retrieves the media file with the specified key, with the option to resize the image.
 *     tags:
 *       - media
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique key of the media file to retrieve.
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *           maximum: 500
 *         description: The size (in pixels) to resize the image to. Only valid for image files.
 *     responses:
 *       '200':
 *         description: Returns the requested media file.
 *         content:
 *           any media mimetype:
 *             type: string
 *             format: binary
 *       '404':
 *         description: Returns an error message if the media file is not found.
 *         content:
 *           application/json:
 *             type: string
 *             example: File not found
 *   delete:
 *     summary: Delete a media file by author
 *     description: Deletes the media file uploaded by the authenticated user.
 *     tags:
 *       - media
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Returns an empty response if the file was deleted successfully.
 *       '404':
 *         description: Returns an error message if the media file is not found.
 *         content:
 *           application/json:
 *             type: string
 *             example: File not found
 */

const joi = require('joi');
const sharp = require('sharp');
const fs = require('fs');

const { MediaModel } = require('../../../models/Media');

const { joiValidate } = require('../../../middleware/validation');

const getSchema = joi.object({
  key: joi.string().length(Number(process.env.MEDIA_KEY_LEN)).required(),
});

const sizeQuerySchema = joi.object({
  size: joi.number().max(500),
});

const turnSizeIntoNumberBeforeValidation = () => (req, res, next) => {
  if (req.query?.size) req.query.size = Number(req.query.size);
  next();
};

module.exports.get = [
  turnSizeIntoNumberBeforeValidation(),
  joiValidate(getSchema, 'params'),
  joiValidate(sizeQuerySchema, 'query'),
  async (req, res) => {
    const currentFile = await MediaModel.findOne({ key: req.params.key });
    if (!currentFile) return res.status(404).json('File not found');

    res.writeHead(200, {
      'Content-Type': req.query?.size ? 'image/png' : currentFile.mimetype,
    });

    if (req.query?.size) {
      let path = currentFile.thumbnail || currentFile.path;
      return sharp(path, { animated: currentFile.mimetype?.includes('gif') })
        .resize(req.query.size, req.query.size, { fit: 'inside' })
        .pipe(res);
    }

    fs.createReadStream(currentFile?.path).pipe(res);
  },
];

module.exports.delete = async (req, res) => {
  const currentFile = await MediaModel.findOne({ author: req.apiUserId });
  if (!currentFile) return res.status(404).json('File not found');

  await currentFile.deleteOne();
  return res.status(200).json();
};
