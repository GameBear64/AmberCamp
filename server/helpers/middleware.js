exports.trimBodyFields = (req, res, next) => {
  const trimString = (input) => {
    if (typeof input === 'string')
      return input.trim();
    if (input !== null && typeof input === 'object') {
      Object.keys(input).forEach((key) => {
        input[key] = trimString(input[key]);
      });
    }
    return input;
  }

  req.body = trimString(req.body);

  next();
}