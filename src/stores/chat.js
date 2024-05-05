import { persistentMap } from '@nanostores/persistent';

const defaultState = {
  id: '',
};

export const $chat = persistentMap('chat', defaultState);

export function setChat(chatId) {
  $chat.setKey('id', chatId);
}

export function getChatId() {
  return $chat.get().id;
}
