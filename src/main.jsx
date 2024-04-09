import ReactDOM from 'react-dom/client';

import ThemesProvider from '@utils/react/ThemesProvider';
import useFetch from '@utils/useFetch';
import { setUser } from '@stores/user';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemesProvider>
    <Router />
  </ThemesProvider>
);
