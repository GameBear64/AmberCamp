import { map } from 'nanostores';

import { useFetch } from '@utils/useFetch';
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
  }).then((res) => {
    if (res.status === 200) {
      $preferences.setKey('theme', theme);
    } else {
      // For the devs to debug
      console.log(res.message);
    }
  });
}

export function setAccent(accent) {
  useFetch({
    url: 'user/settings',
    method: 'PATCH',
    body: {
      accent,
    },
  }).then((res) => {
    if (res.status === 200) {
      $preferences.setKey('accent', accent);
    } else {
      // For the devs to debug
      console.log(res.message);
    }
  });
}
