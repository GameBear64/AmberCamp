import { useEffect, useState } from 'react';

import { debounce } from './utils';

const resizeScreen = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', debounce(handleResize));

    return () => {
      window.removeEventListener('resize', debounce(handleResize));
    };
  });
  return windowSize;
};

export default resizeScreen;
