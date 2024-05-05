export const ContactType = Object.freeze({
  Friends: 'Friends',
  Pending: 'Pending',
  Blocked: 'Blocked',
  Incoming: 'incoming',
  Outgoing: 'outgoing',
});

export const ContactsOptions = Object.freeze(['Friends', 'Pending', 'Blocked']);

export const Status = Object.freeze({
  friends: 'chat_bubble',
  blocked: 'person_remove',
  pending: 'close',
});
