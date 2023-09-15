const { sanitizeHTML } = require('../utils');

exports.trimBodyFields = (req, res, next) => {
  // https://www.npmjs.com/package/request_trimmer
  const trimString = (input) => {
    if (typeof input === 'string') return sanitizeHTML(input.trim());
    if (input !== null && typeof input === 'object') {
      Object.keys(input).forEach((key) => {
        input[key] = trimString(input[key]);
      });
    }
    return input;
  };

  req.body = trimString(req.body);

  next();
};
