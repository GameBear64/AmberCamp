const { slugifyString } = require('../utils');

exports.base64ToBuffer = (field) => (req, res, next) => {
  if (req.body[field]?.includes(';base64,')) {
    req.body[field] = req.body?.[field]?.split(';base64,')?.pop();
  }

  req.body[field] = Buffer.from(req.body?.[field], 'base64');

  next();
};

exports.slugifyField = (field) => (req, res, next) => {
  req.body[field] = slugifyString(req.body?.[field]);
  next();
};
