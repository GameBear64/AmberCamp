// Get: Get list of all questions
module.exports.get = async (req, res) => {
  return res.status(200).json({
    answered: [
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
    ],
    asked: [
      {
        _id: '6616fdd61c48f792b9dfbedb',
        author: '65c37cf289e9c625600c27cd',
        question: 'If you could go back in time, what is one situation you would do differently?',
        category: 'General',
        anonymous: true,
        answers: [
          {
            _id: '661688503a046ca113e53990',
            messages: [
              {
                _id: '75c37cf289e9c625699c27cd',
                author: '65c37cf289e9c625699c27cd',
                body: 'well, let me think...',
              },
            ],
          },
        ],
      },
      {
        _id: '6616fdd61c48f792b9dfbedb',
        author: '65c37cf289e9c625600c27cd',
        question: 'What is your favorite book and why?',
        category: 'Literature',
        anonymous: false,
        answers: [
          {
            _id: '661688503a046ca113e53991',
            messages: [
              {
                _id: '75c37cf289e9c625699c27cd',
                author: '65c37cf289e9c625699c27cd',
                body: 'I love "To Kill a Mockingbird" because...',
              },
            ],
          },
          {
            _id: '661688503a046ca113e53992',
            messages: [
              {
                _id: '75c37cf289e9c625699c27ce',
                author: '65c37cf289e9c625699c27ce',
                body: 'My favorite book is "Harry Potter and the Philosopher\'s Stone" because...',
              },
            ],
          },
        ],
      },
      {
        _id: '6616fdd61c48f792b7dfbedb',
        author: '65c57cf289e9c625600c27cd',
        question: 'What is your favorite movie and why?',
        category: 'Film',
        anonymous: true,
        answers: [],
      },
      {
        _id: '6616fdd61c48f792b9dfbedb',
        author: '65c37cf289e9c625600c27cd',
        question: 'If you could have one superpower, what would it be?',
        category: 'General',
        anonymous: false,
        answers: [
          {
            _id: '661688503a046ca113e53993',
            messages: [
              {
                _id: '75c37cf289e9c625699c27d0',
                author: '65c37cf289e9c625699c27d0',
                body: 'Being faster than light, that also unlocks time travel!',
              },
            ],
          },
          {
            _id: '661688503a046ca113e53994',
            messages: [
              {
                _id: '75c37cf289e9c625699c27d0',
                author: '65c37cf289e9c625699c27d0',
                body: 'I would choose the power of teleportation.',
              },
            ],
          },
          {
            _id: '661688503a046ca113e53993',
            messages: [
              {
                _id: '75c37cf289e9c625699c27d0',
                author: '65c37cf289e9c625699c27d0',
                body: 'Manifesting everything I can think of would be perfect for me.',
              },
            ],
          },
        ],
      },
      {
        _id: '6616fdd61c48f792b5dfbedb',
        author: '65c77cf289e9c625600c27cd',
        question: 'What is your favorite food and why?',
        category: 'Food',
        anonymous: true,
        answers: [
          {
            _id: '661688503a046ca113e53995',
            messages: [
              {
                _id: '75c37cf289e9c625699c27d1',
                author: '65c37cf289e9c625699c27d1',
                body: 'My favorite food is pizza because...',
              },
            ],
          },
          {
            _id: '661688503a046ca113e53996',
            messages: [
              {
                _id: '75c37cf289e9c625699c27d2',
                author: '65c37cf289e9c625699c27d2',
                body: 'I enjoy the taste and versatility of pasta.',
              },
            ],
          },
        ],
      },
    ],
  });
};
