import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { useStore } from '@nanostores/react';

import { $preferences } from '@stores/preferences';
import { setUser } from '@stores/user';
import useFetch from '@utils/useFetch';

import Router from './routers/Router';
import { setPreferences } from './stores/preferences';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';

// set user store
useFetch({ url: 'user', redirect: false }).then((data) => {
  setUser({ id: data._id });
  setPreferences({
    theme: data.theme,
    accent: data.accent,
    language: data.language,
  });
});

function Main() {
  const preferences = useStore($preferences);

  useEffect(() => {
    const themes = `theme-${preferences.theme.toLocaleLowerCase()} theme-${preferences.accent?.toLocaleLowerCase()}`;
    document.body.className = themes;
  }, [preferences.theme, preferences.accent]);

  return <Router />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
