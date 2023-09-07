const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const codes = require('referral-codes');
const { FriendshipStatus } = require('./enums');

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
    ?.replace(/[^\x00-\x7F]/g, '')
    ?.substring(0, 200);

// TODO: make this into a separate middleware and include confusables
exports.sanitizeHTML = (string) => string?.replace(/\\/g, '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;'); //.replace(/&/g, '&amp;').replace(///g, '&#x2F;');

exports.getCode = (length) => codes.generate({ length })[0];

exports.videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mpeg', 'mkv', 'webm'];
exports.imageExtensions = ['jpg', 'jpeg', 'webp', 'png', 'gif', 'avif', 'tiff', 'svg'];

// https://stackoverflow.com/a/32402438/7149508
exports.wildcardMatch = (wildcard, str) => {
  let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape
  const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return re.test(str); // remove last 'i' above to have case sensitive
};

exports.getFriendshipStatus = (firstFriend, secondFriend) => {
  console.log('1', firstFriend, '2', secondFriend);

  // Pending
  if (firstFriend.pendingContacts.includes(secondFriend._Id) || secondFriend.pendingContacts.includes(firstFriend._Id))
    return FriendshipStatus.Pending;

  // Friends
  if (firstFriend.contacts.includes(secondFriend._Id) && secondFriend.contacts.includes(firstFriend._Id))
    return FriendshipStatus.Friends;

  // Blocked
  if (firstFriend.blocked.includes(secondFriend._Id) || secondFriend.blocked.includes(firstFriend._Id))
    return FriendshipStatus.Blocked;

  // Strangers
  return FriendshipStatus.Strangers;
};
