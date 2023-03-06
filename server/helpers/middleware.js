const { UserModel } = require("../models/User");
const jwt = require("jsonwebtoken");

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

let noAuthRoutes = [
  { path: '/user/login', methods: ['POST'] },
  { path: '/user/register', methods: ['POST'] }
]

exports.checkAuth = async (req, res, next) => {
  let isNoAuthRoute = noAuthRoutes.some(route => route.path == req.path && route.methods.includes(req.method))
  if (isNoAuthRoute) return next();

  try {
    let decoded = jwt.verify(req.headers.jwt, process.env.SECRET);
    let userExists = await UserModel.exists({ _id: decoded.id })
    //remove check and update activity status here later 
    //if update files - user does not exits
    //used on the frontend for "last online" timestamp
    if (userExists === null) return res.status(401).send({ error: 'User no longer exists.' });

    req.apiUserId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Not Authorized' });
  }
};