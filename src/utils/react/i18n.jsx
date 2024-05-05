import { useEffect, useState } from 'react';

//TODO: use this when adding language support
export default function I18n(string, ignoreNewline = false) {
  // let { language } = useContext<AppContextType>(AppContext);
  let language = 'bg';
  const [translation, setTranslation] = useState();

  useEffect(() => {
    import(`../data/${language}.json`)
      .then((data) => setTranslation(data.default?.[string] || string))
      .catch(() => {
        setTranslation(string);
      });
  }, [language, string]);

  return ignoreNewline ? translation.replace(/\n/g, ' ') : translation;
}
