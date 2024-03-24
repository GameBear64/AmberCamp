import { useEffect, useState } from 'react';

import { debounce } from './utils';

export default (settings) => {  
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', debounce(handleResize, settings?.timeout));

    return () => {
      window.removeEventListener('resize', debounce(handleResize, settings?.timeout));
    };
  });
  return windowSize;
};