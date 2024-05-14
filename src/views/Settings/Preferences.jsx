import { useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import TopBar from '@components/Layout/TopBar';
import RoundButton from '@components/RoundButton';

import { AccentColors } from '@utils/enums/settings';
import { $preferences, setAccent, setTheme } from '@stores/preferences';

export default function Preferences() {
  const navigate = useNavigate();
  const accent = useStore($preferences).accent;

  return (
    <div>
      <div className="block md:hidden">
        <TopBar backBtnLabel="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="flex flex-col gap-6 p-10">
        <div>
          <h2 className="font-semibold text-txtSecondary">THEME</h2>
          <div className="mt-2 flex flex-row gap-4">
            <button onClick={() => setTheme('Light')} className="accent-circle bg-yellow-500 text-white">
              <span className="material-symbols-rounded cursor-pointer text-2xl">light_mode</span>
            </button>
            <button onClick={() => setTheme('Dark')} className="accent-circle bg-gray-700 text-white">
              <span className="material-symbols-rounded cursor-pointer text-2xl">dark_mode</span>
            </button>
            <button onClick={() => setTheme('Black')} className="accent-circle bg-black text-white">
              <span className="material-symbols-rounded cursor-pointer text-2xl">nights_stay</span>
            </button>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-txtSecondary">ACCENT</h2>
          <div className="mt-2 flex flex-row flex-wrap gap-4">
            {Object.entries(AccentColors).map((color) => (
              <RoundButton
                key={color[0]}
                colors={color[1]}
                highlighted={accent === color[0]}
                onClick={() => setAccent(color[0])}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
