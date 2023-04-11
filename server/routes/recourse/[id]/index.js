const fs = require('fs').promises;

const { MediaModel } = require('../../../models/Media');

module.exports.delete = async (req, res) => {
  const currentFile = await MediaModel.findOne({ _id: req.params.id, author: req.apiUserId });
  if (!currentFile) return res.status(404).json('File not found');

  await currentFile.deleteOne();
  return res.status(200).json('Entry deleted.');
};
