import { atom } from 'nanostores';

const defaultState = {
  id: null,
};

export const $user = atom(structuredClone(defaultState));

export function setUser(userDetails) {
  $user.set(userDetails);
}

export function removeUser() {
  localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
  $user.set(structuredClone(defaultState));
}

export function getUserId() {
  return $user.get().id;
}
