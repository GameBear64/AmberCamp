module.exports.get = async (req, res) => {
  res.status(200).send({ message: 'this is user' });
};

module.exports.delete = async (req, res) => {
  res.status(200).send({ message: 'good bye user' });
};
