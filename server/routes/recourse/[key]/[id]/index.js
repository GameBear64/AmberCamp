const joi = require('joi');
const sharp = require('sharp');
const fs = require('fs');

const { MediaModel } = require('../../../../models/Media');

const { joiValidate } = require('../../../../helpers/middleware');

const getSchema = joi.object({
  id: joi.string().required(),
  key: joi.string().length(20).required(),
});

const sizeQuerySchema = joi.object({
  size: joi.number().max(500),
});

module.exports.get = [
  (req, res, next) => {
    if (req.query?.size) req.query.size = Number(req.query.size);
    next();
  },
  joiValidate(getSchema, 'params'),
  joiValidate(sizeQuerySchema, 'query'),
  async (req, res) => {
    const currentFile = await MediaModel.findOne({ _id: req.params.id, key: req.params.key });
    if (!currentFile) return res.status(404).json('File not found');

    res.writeHead(200, {
      'Content-Type': req.query?.size ? 'image/png' : currentFile.mimetype,
    });

    if (req.query?.size) {
      let path = currentFile.thumbnail || currentFile.path;
      return sharp(path).resize(req.query.size, req.query.size, { fit: 'inside' }).pipe(res);
    }

    fs.createReadStream(currentFile?.path).pipe(res);
  },
];
