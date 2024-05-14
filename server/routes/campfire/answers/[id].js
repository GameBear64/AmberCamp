// Get: get the question details + message history (depending on who you are)
// Post: Answer a question (create a new conversation with type question and give the user a point)
// Delete: delete an asked question with ?id=

module.exports.get = async (req, res) => {
  return res.status(200).json([
    {
      _id: '661688503a046ca113e53981',
      messages: [
        {
          _id: '75c37cf289e9c625699c27cd',
          author: '65c37cf289e9c625699c27cd',
          body: 'I love "To Kill a Mockingbird" because...',
        },
      ],
    },
    {
      _id: '661688503a046ca113e53971',
      messages: [
        {
          _id: '75c37cf289e9c625699c27cd',
          author: '65c37cf289e9c625699c27cd',
          body: 'I only read manga!',
        },
      ],
    },
    {
      _id: '661688503a046ca113e53961',
      messages: [
        {
          _id: '75c37cf289e9c625699c27cd',
          author: '65c37cf289e9c625699c27cd',
          body: 'Can you guess? :]',
        },
      ],
    },
  ]);
};
