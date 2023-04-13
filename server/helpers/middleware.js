const { UserModel } = require('../models/User');
const jwt = require('jsonwebtoken');
const { sanitizeHTML, slugifyString, wildcardMatch } = require('./utils');

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

let noAuthRoutes = [
  { path: '/user/login', methods: ['POST'] },
  { path: '/user/register', methods: ['POST'] },
  { path: '/recourse/*', methods: ['GET'] },
  { path: '/api-docs/*', methods: ['GET'] },
];

exports.checkAuth = async (req, res, next) => {
  let isNoAuthRoute = noAuthRoutes.some((route) => wildcardMatch(route.path, req.path) && route.methods.includes(req.method));
  if (isNoAuthRoute) return next();

  try {
    let decoded = jwt.verify(req.headers?.jwt, process.env.SECRET);
    let currentUser = await UserModel.exists({ _id: decoded.id }).select('+passwordChangedAt');
    // update activity status here whenever user passes trough - use on frontend for "last online" timestamp

    if (!currentUser) return res.status(401).json({ error: 'The user belonging to this token no longer exist.' });

    if (currentUser?.passwordChangedAt) {
      let lastChanged = currentUser.passwordChangedAt.getTime() / 1000;
      if (decoded.iat < lastChanged)
        return res.status(401).json({ error: 'User recently changed password! Please log in again.' });
    }

    req.apiUserId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not Authorized' });
  }
};

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

exports.allowNoBodyChanges = () => (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.json(200);
  next();
};

// prettier-ignore
exports.joiValidate = (schema, realm = 'body') => (req, res, next) => {
  let validation = schema.validate(req[realm]);
  if (validation.error) return res.status(400).json(validation.error.details[0].message);

  next();
};
