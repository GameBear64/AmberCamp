import { useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import TopBar from '@components/Layout/TopBar';

import { $preferences, setAccent, setTheme } from '@stores/preferences';

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
              className="accent-circle bg-yellow-300 text-black">
              <span className="material-symbols-rounded cursor-pointer text-2xl">light_mode</span>
            </button>
            <button
              onClick={() => setTheme('Dark')}
              className="accent-circle bg-gray-700 text-white">
              <span className="material-symbols-rounded cursor-pointer text-2xl">dark_mode</span>
            </button>
            <button
              onClick={() => setTheme('Black')}
              className="accent-circle bg-black text-white">
              <span className="material-symbols-rounded cursor-pointer text-2xl">nights_stay</span>
            </button>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-txtSecondary">ACCENT</h2>
          <div className="mt-2 flex flex-row flex-wrap gap-4">
            <button
              onClick={() => setAccent('Pink')}
              className={`accent-circle bg-pink-600 ${accent === 'Pink' && 'border-4 border-txtPrimary'} `}></button>
            <button
              onClick={() => setAccent('Violet')}
              className={`accent-circle bg-violet-600 ${accent === 'Violet' && 'border-4 border-txtPrimary'}`}></button>
            <button
              onClick={() => setAccent('Blue')}
              className={`accent-circle bg-blue-600 ${accent === 'Blue' && 'border-4 border-txtPrimary'}`}></button>
            <button
              onClick={() => setAccent('Green')}
              className={`accent-circle bg-green-600 ${accent === 'Green' && 'border-4 border-txtPrimary'}`}></button>
            <button
              onClick={() => setAccent('Red')}
              className={`accent-circle bg-red-600 ${accent === 'Red' && 'border-4 border-txtPrimary'}`}></button>
            <button
              onClick={() => setAccent('Orange')}
              className={`accent-circle bg-orange-600 ${accent === 'Orange' && 'border-4 border-txtPrimary'}`}></button>
          </div>
        </div>
      </div>
    </>
  );
}
