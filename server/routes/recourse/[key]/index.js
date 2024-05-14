const joi = require('joi');
const sharp = require('sharp');
const fs = require('fs');

const { MediaModel } = require('../../../models/Media');

const { joiValidate, InformationTypes } = require('../../../middleware/validation');

const turnSizeIntoNumberBeforeValidation = () => (req, res, next) => {
  if (req.query?.size) req.query.size = Number(req.query.size);
  next();
};

module.exports.get = [
  turnSizeIntoNumberBeforeValidation(),
  joiValidate({ key: joi.string().length(Number(process.env.MEDIA_KEY_LEN)).required() }, InformationTypes.PARAMS),
  joiValidate({ size: joi.number().max(500) }, InformationTypes.QUERY),
  async (req, res) => {
    const currentFile = await MediaModel.findOne({ key: req.params.key });
    if (!currentFile) return res.status(404).json('File not found');

    res.writeHead(200, {
      'Content-Type': req.query?.size ? 'image/png' : currentFile.mimetype,
    });

    if (req.query?.size) {
      let path = currentFile?.thumbnail || currentFile.path;
      return sharp(path, { animated: currentFile.mimetype?.includes('gif') })
        .resize(req.query.size, req.query.size, { fit: 'inside' })
        .pipe(res);
    }

    if (req.query?.size == 0 && currentFile?.thumbnail) {
      return fs.createReadStream(currentFile?.thumbnail).pipe(res);
    }

    // NOTE: KNOWN BUG: if the file is present in the db but not in the file system we get an err
    fs.createReadStream(currentFile?.path).pipe(res);
  },
];

module.exports.delete = async (req, res) => {
  const currentFile = await MediaModel.findOne({ author: req.apiUserId });
  if (!currentFile) return res.status(404).json('File not found');

  await currentFile.deleteOne();
  return res.status(200).json();
};
