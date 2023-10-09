const { UserModel } = require('../models/User');
const jwt = require('jsonwebtoken');
const { wildcardMatch } = require('../utils');

let noAuthRoutes = [
  { path: '/user/login', methods: ['POST'] },
  { path: '/user/register', methods: ['POST'] },
  { path: '/recourse/*', methods: ['GET'] },
  { path: '/api-docs/*', methods: ['GET'] },
  { path: '/favicon.ico', methods: ['GET'] },
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
      if (decoded.iat < lastChanged) return res.status(401).json('User recently changed password! Please log in again.');
    }

    req.apiUserId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not Authorized' });
  }
};
