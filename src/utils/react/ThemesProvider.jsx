import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useStore } from '@nanostores/react';

import { $preferences } from '@stores/preferences';

export default function ThemesProvider({children}) {
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
      {children}
    </SkeletonTheme>
  )
}