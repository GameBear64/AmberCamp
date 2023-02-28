const jwt = require("jsonwebtoken");

exports.createJWTCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
}

exports.storedUserFields = ({ _id }) => ({ _id });
