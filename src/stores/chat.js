import { map } from 'nanostores';

const defaultState = {
  id: null,
};

export const $chat = map(defaultState);

export function setChat(chatId) {
  $chat.setKey('id', chatId);
}

export function getChatId() {
  return $chat.get().id;
}
