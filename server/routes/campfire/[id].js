// Get: get the question details + message history (depending on who you are)
// Post: Answer a question (create a new conversation with type question and give the user a point)
// Delete: delete an asked question with ?id=

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
            body: 'If you could go back in time, what is one situation you would do differently?',
          },
          {
            _id: '85c37cf289e9c625699c27dd',
            author: '75c37cf289e9c625699c27dd',
            body: 'I would probably study harder in college.',
          },
          {
            _id: '95c37cf289e9c625699c27ee',
            author: '65c37cf289e9c625699c27cd',
            body: 'That sounds like a good idea. College is definitely important.',
          },
          {
            _id: 'a5c37cf289e9c625699c27ff',
            author: '75c37cf289e9c625699c27dd',
            body: 'Yeah, looking back, I wish I had taken it more seriously.',
          },
          {
            _id: 'b5c37cf289e9c625699c27gg',
            author: '65c37cf289e9c625699c27cd',
            body: "It's never too late to learn and grow though!",
          },
          {
            _id: 'c5c37cf289e9c625699c27hh',
            author: '75c37cf289e9c625699c27dd',
            body: "That's true. I'm trying to make up for lost time now.",
          },
          {
            _id: 'd5c37cf289e9c625699c27ii',
            author: '65c37cf289e9c625699c27cd',
            body: "That's the spirit!",
          },
        ],
      },
    },
  ]);
};
