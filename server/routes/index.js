module.exports.get = (req, res) => {
  res.status(200).json({ message: 'You are logged in' });
};
