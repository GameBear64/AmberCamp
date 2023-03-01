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

exports.checkAuth = (req, res, next) => {
  let isNoAuthRoute = noAuthRoutes.some(route => route.path == req.path && route.methods.includes(req.method))
  if (isNoAuthRoute) return next();

  try {
    let decoded = jwt.verify(req.headers.jwt, process.env.SECRET);
    req.apiUserId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send('Not Authorized');
  }
};