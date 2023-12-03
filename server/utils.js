const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const codes = require('referral-codes');
const { FriendshipStatus } = require('./enums');

/**
 * Creates a JWT cookie based on a user's information. (_id)
 */
exports.createJWTCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
};

/**
 * Checks if a value is a valid ObjectID or not. (joi)
 */
exports.isObjectID = (value, helper) => {
  return ObjectId.isValid(value) || helper.message('Invalid Id');
};

/**
 * Checks if the given chunk is under 1MB. (joi)
 */
exports.chunkUnderMeg = (value, helper) => {
  return (
    Buffer.byteLength(value) <= 1048576 ||
    helper.message(`Chunk (${(Buffer.byteLength(value) / 1048576).toFixed(2)}MB) can not be over 1MB`)
  );
};

// https://stackoverflow.com/a/57071072/7149508
/**
 * @param {Buffer} buf - The input buffer to be split.
 * @param {number} maxBytes - The maximum size in bytes for each chunk.
 * @yields {string} A chunk of the input buffer as a string.
 */
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
/**
 * Converts a string into a slug format suitable for URLs.
 */
exports.slugifyString = (text) =>
  text
    ?.toLowerCase()
    ?.replace(/[^\w ]+/g, '')
    ?.replace(/ +/g, '-')
    ?.trim()
    ?.replace(/[^\x00-\x7F]/g, '')
    ?.substring(0, 200);

// TODO: make this into a separate middleware and include confusables
/**
 * Sanitizes HTML by escaping certain characters.
 */
exports.sanitizeHTML = (string) => string?.replace(/\\/g, '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;'); //.replace(/&/g, '&amp;').replace(///g, '&#x2F;');

/**
 * @param {number} length - The length of the code to generate.
 */
exports.getCode = (length) => codes.generate({ length })[0];

exports.videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mpeg', 'mkv', 'webm'];
exports.imageExtensions = ['jpg', 'jpeg', 'webp', 'png', 'gif', 'avif', 'tiff', 'svg'];

// https://stackoverflow.com/a/32402438/7149508
/**
 * @param {string} wildcard - The wildcard pattern to match against.
 * @param {string} str - The string to be matched.
 * @returns {boolean} True if the string matches the wildcard pattern; otherwise, false.
 */
exports.wildcardMatch = (wildcard, str) => {
  let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape
  const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return re.test(str);
};

exports.getFriendshipStatus = (currentUser, secondFriend) => {
  // Pending
  if (currentUser.pendingContacts.includes(secondFriend._id)) return FriendshipStatus.PendingIn;
  if (secondFriend.pendingContacts.includes(currentUser._id)) return FriendshipStatus.PendingOut;

  // Friends
  if (currentUser.contacts.includes(secondFriend._id) && secondFriend.contacts.includes(currentUser._id))
    return FriendshipStatus.Friends;

  // Blocked
  if (currentUser.blocked.includes(secondFriend._id) || secondFriend.blocked.includes(currentUser._id))
    return FriendshipStatus.Blocked;

  // Strangers
  return FriendshipStatus.Strangers;
};

/**
 * @param {Object} object - The input object to be cleaned.
 * @param {string[]} desiredFields - An array of field names to include in the cleaned object.
 */
exports.cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map((field) => ([field] in object ? { [field]: object[field] } : {})));
};

/**
 * Removes properties with empty values from an object.
 */
exports.removeEmptyProperties = (object) => {
  return Object.keys(object)
    .filter((key) => object[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
};
