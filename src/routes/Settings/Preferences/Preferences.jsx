// TODO: remove when BE is ready
/* eslint-disable no-console */
import { useState } from 'react';

import { useFetch } from '@utils/useFetch';

export default function Preferences() {
  let accents = [
    { color: '#FDBA74', name: 'default' },
    { color: '#5865f5', name: 'blue' },
    { color: '#6FD25A', name: 'green' },
  ];
  let languages = ['English UK', 'English US', 'Italiano', 'Български', 'Français'];
  let [userPreferences, setUserPreferences] = useState('');

  // // TODO: fix when BE is ready
  // const getPreferences = () => {
  //   useFetch({
  //     url: 'user/settings/preferences',
  //     method: 'GET',
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       console.log(res.message);
  //       setUserPreferences({
  //         theme: res.message.theme,
  //         accent: res.message.accent,
  //         language: res.message.language,
  //       });
  //     } else {
  //       console.log(res.message);
  //     }
  //   });
  // };
  const changeUserTheme = () => {
    useFetch({
      url: 'user/settings/preferences',
      method: 'PATCH',
      body: {
        theme: userPreferences.theme,
        accent: userPreferences.accent ?? 'string',
        language: userPreferences.language,
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.message);
      } else {
        // For the devs to debug
        console.log(res.message);
      }
    });
  };
  // console.log(userPreferences);

  return (
    <>
      <div className="p-10">
        <div>
          <h2 className="font-semibold">THEME</h2>
          <div className="mt-4 flex flex-row gap-4">
            <div
              onClick={() => {
                setUserPreferences({
                  theme: 'Dark',
                  accent: userPreferences.accent === '' && 'string',
                  language: userPreferences.language === '' && 'st',
                });
                console.log(userPreferences);
              }}
              className={`rounded-full bg-black ${
                userPreferences.theme === 'Dark' ? 'border-4 border-indigo-500/100' : 'border-4 border-slate-500/100'
              } p-10`}></div>
            <div
              onClick={() => {
                setUserPreferences({
                  theme: 'Light',
                  accent: userPreferences.accent === '' && 'string',
                  language: userPreferences.language === '' && 'st',
                });
                console.log(userPreferences);
              }}
              className={`rounded-full bg-white ${
                userPreferences.theme === 'Light' ? 'border-4 border-indigo-500/100' : 'border-4 border-slate-500/100'
              } p-10`}></div>
          </div>
        </div>
        <div>
          <h2 className="mt-4 font-semibold">LANGUAGE</h2>
          <div className="mb-4 mt-2">
            {/* add selected */}
            <select className="rounded border-none" id="">
              {languages.map((language) => {
                return (
                  <>
                    <option
                      className="
                  rounded border-none">
                      {language}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <h2 className="font-semibold">ACCENT COLOR</h2>
          <div className="mt-4 flex flex-row gap-4">
            {accents.map((accent) => {
              return (
                <>
                  <div className={`bg-[${accent?.color}] rounded-full border-4 border-slate-500/100 p-10`}></div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          changeUserTheme();
          console.log(userPreferences);
        }}
        className="mx-10 my-4 rounded bg-neutral-200 p-1 px-3 font-semibold">
        Save
      </button>
    </>
  );
}
