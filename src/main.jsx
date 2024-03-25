import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useStore } from '@nanostores/react';

import useFetch from '@utils/useFetch';
import { $preferences } from '@stores/preferences';
import { setUser } from '@stores/user';

import Router from './routers/Router';
import { setPreferences } from './stores/preferences';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';

// set user store
useFetch({ url: 'user' }).then((data) => {
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

  return (
    <SkeletonTheme
      // compromise variant since we cant edit the colors with css 
      baseColor={preferences.theme.toLocaleLowerCase() === 'light' ? "#ebebeb" : "#202020"}
      highlightColor={preferences.theme.toLocaleLowerCase() === 'light' ? "#f5f5f5" : "#444"}
    >
      <Router />
    </SkeletonTheme>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
