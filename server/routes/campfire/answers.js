// Get: Get list of questions (all or) in a certain category with a query ?category=[asked|answered|queue]
module.exports.get = async (req, res) => {
  return res.status(200).json([
    {
      _id: '6616fdd61c48f792b9dfbedb',
      author: '65c37cf289e9c625600c27cd',
      question: 'If you could go back in time, what is one situation you would do differently?',
      category: 'General',
      anonymous: true,
      answer: {
        _id: '661688503a046ca113e53990',
        messages: [
          {
            _id: '75c37cf289e9c625699c27cd',
            author: '65c37cf289e9c625699c27cd',
            body: 'well, let me think...',
          },
        ],
      },
    },
    {
      _id: '6616fdd61c48f792b9dfbedb',
      author: '65c37cf289e9c625600c27cd',
      question: 'What is your favorite book and why?',
      category: 'Literature',
      anonymous: false,
      answer: {
        _id: '661688503a046ca113e53991',
        messages: [
          {
            _id: '75c37cf289e9c625699c27cd',
            author: '65c37cf289e9c625699c27cd',
            body: 'I love "To Kill a Mockingbird" because...',
          },
        ],
      },
    },
  ]);
};
