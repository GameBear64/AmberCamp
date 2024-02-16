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

const decodeJWT = async (token) => {
  let decoded = jwt.verify(token, process.env.SECRET);

  let currentUser = await UserModel.exists({ _id: decoded.id }).select('+passwordChangedAt');

  // update activity status here whenever user passes trough - use on frontend for "last online" timestamp

  if (!currentUser) throw new Error('The user belonging to this token no longer exist.');

  if (currentUser?.passwordChangedAt) {
    let lastChanged = currentUser.passwordChangedAt.getTime() / 1000;
    if (decoded.iat < lastChanged) throw new Error('User changed password, please log in again.');
  }

  return decoded.id;
};

exports.checkAuth = async (req, res, next) => {
  let isNoAuthRoute = noAuthRoutes.some((route) => wildcardMatch(route.path, req.path) && route.methods.includes(req.method));
  if (isNoAuthRoute) return next();

  try {
    req.apiUserId = await decodeJWT(req.headers?.jwt);

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json('Not Authorized');

    return res.status(401).json(err.message);
  }
};

exports.socketAuth = async (socket, next) => {
  try {    
    socket.apiUserId = await decodeJWT(socket?.handshake?.auth?.jwt);
    socket.join(socket.apiUserId)
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return socket.emit('Not Authorized');

    return socket.emit(err.message);
  }
};
