const joi = require('joi');

exports.allowNoBodyChanges = () => (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.json(200);
  next();
};

exports.InformationTypes = Object.freeze({
  BODY: 'body',
  PARAMS: 'params',
  QUERY: 'query',
});

// prettier-ignore
exports.joiValidate = (schema, realm = 'body') => (req, res, next) => {
  const validation = joi.object(schema).validate(req[realm]);
  if (validation.error) return res.status(400).json(validation.error.details[0].message);

  next();
};

exports.socketValidate =
  (schema) =>
  ({ socket }, data, next) => {
    const validation = joi.object(schema).validate(data);
    if (validation.error) return socket.emit('error', validation.error.details[0].message);

    next();
  };
