const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createJWTCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
};

exports.storedUserFields = ({ _id }) => ({ _id });

exports.isObjectID = (value, helper) => {
  return ObjectId.isValid(value) || helper.message('Invalid Id');
};

exports.chunkUnderMeg = (value, helper) => {
  return (
    Buffer.byteLength(value) <= 1048576 ||
    helper.message(`Chunk (${(Buffer.byteLength(value) / 1048576).toFixed(2)}MB) can not be over 1MB`)
  );
};

// https://stackoverflow.com/a/57071072/7149508
exports.chunkBuffer = function* (buf, maxBytes) {
  while (buf.length) {
    let i = buf.lastIndexOf(32, maxBytes + 1);
    if (i < 0) i = buf.indexOf(32, maxBytes);
    if (i < 0) i = buf.length;
    yield buf.slice(0, i).toString();
    buf = buf.slice(i + 1);
  }
};

// https://stackoverflow.com/a/1054862/7149508
// TODO: into middleware?
exports.slugifyString = (text) =>
  text
    ?.toLowerCase()
    ?.replace(/[^\w ]+/g, '')
    ?.replace(/ +/g, '-')
    ?.trim()
    ?.replace(/[^\x00-\x7F]/g, '');

// TODO: make this into a separate middleware and include confusables
exports.sanitizeHTML = (string) => JSON.stringify(string?.replace(/\\/g, '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;')); //.replace(/&/g, '&amp;').replace(///g, '&#x2F;');
