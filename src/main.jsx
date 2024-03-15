import { useEffect } from 'react'
import ReactDOM from 'react-dom/client';

import { useStore } from '@nanostores/react';
import { $preferences } from '@stores/preferences';
import { setUser } from '@stores/user';
import { useFetch } from '@utils/useFetch';

import Router from './routers/Router';
import { setPreferences } from './stores/preferences';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';

// set user store
useFetch({ url: 'user' }).then((data) => {
  setUser({ id: data.message._id });
  setPreferences({
    theme: data.message.theme,
    accent: data.message.accent,
    language: data.message.language,
  });
});

function Main() {
  const preferences = useStore($preferences);
  const themes = `theme-${preferences.theme.toLocaleLowerCase()} theme-${preferences.accent?.toLocaleLowerCase()}`;

  useEffect(() => {
    document.body.className = themes
  }, [preferences.theme, preferences.accent])

  return <Router />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
