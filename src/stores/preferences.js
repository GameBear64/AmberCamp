import { map } from 'nanostores';

import useFetch from '@utils/useFetch';
const defaultState = { theme: 'Light', accent: 'Orange', language: 'EN' };
export const $preferences = map(defaultState);

export function setPreferences(preferencesDetails) {
  $preferences.set(preferencesDetails);
}

export function getPreferences() {
  return $preferences.get().theme;
}

export function setTheme(theme) {
  useFetch({
    url: 'user/settings',
    method: 'PATCH',
    body: {
      theme: theme,
    },
  }).then(() => $preferences.setKey('theme', theme));
}

export function setAccent(accent) {
  useFetch({
    url: 'user/settings',
    method: 'PATCH',
    body: {
      accent,
    },
  }).then(() => $preferences.setKey('accent', accent));
}
