// TODO: remove when BE is ready
/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar/TopBar';
import { $preferences, setAccent, setTheme } from '../../stores/preferences';
export default function Preferences() {
  const navigate = useNavigate();
  const accent = useStore($preferences).accent;

  return (
    <>
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="flex flex-col gap-6 p-10">
        <div>
          <h2 className="font-semibold text-txtSecondary">THEME</h2>
          <div className="mt-2 flex flex-row gap-4">
            <button
              onClick={() => setTheme('Light')}
              className="light-icon rounded-full bg-yellow-500 px-3 py-2
              text-white shadow-md transition duration-700 ease-in-out">
              <span className="material-symbols-outlined cursor-pointer text-2xl">light_mode</span>
            </button>
            <button
              onClick={() => setTheme('Dark')}
              className="dark-icon rounded-full bg-blue-950 px-3 py-2 text-white shadow-md transition duration-700 ease-in-out">
              <span className="material-symbols-outlined cursor-pointer text-2xl">dark_mode</span>
            </button>
            <button
              onClick={() => setTheme('Black')}
              className="black-icon rounded-full bg-black px-3 py-2 text-white shadow-md
              transition duration-700 ease-in-out">
              <span className="material-symbols-outlined cursor-pointer text-2xl">nights_stay</span>
            </button>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-txtSecondary">ACCENT</h2>
          <div className="mt-2 flex flex-row gap-4">
            <button
              onClick={() => setAccent('Pink')}
              className={`accent-button bg-pink-600 ${accent === 'Pink' && 'border-4 border-txtSecondary'} `}></button>
            <button
              onClick={() => setAccent('Violet')}
              className={`accent-button bg-violet-600 ${accent === 'Violet' && 'border-4 border-txtSecondary'}`}></button>
            <button
              onClick={() => setAccent('Blue')}
              className={`accent-button bg-blue-600 ${accent === 'Blue' && 'border-4 border-txtSecondary'}`}></button>
            <button
              onClick={() => setAccent('Green')}
              className={`accent-button bg-green-600 ${accent === 'Green' && 'border-4 border-txtSecondary'}`}></button>
            <button
              onClick={() => setAccent('Red')}
              className={`accent-button bg-red-600 ${accent === 'Red' && 'border-4 border-txtSecondary'}`}></button>
            <button
              onClick={() => setAccent('Orange')}
              className={`accent-button bg-orange-600 ${accent === 'Orange' && 'border-4 border-txtSecondary'}`}></button>
          </div>
        </div>
      </div>
    </>
  );
}
