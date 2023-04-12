module.exports.get = (req, res) => {
  console.log('logged in');
  res.status(200).json({ message: 'You are logged in' });
};
