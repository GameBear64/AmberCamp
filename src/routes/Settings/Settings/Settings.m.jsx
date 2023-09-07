import { useNavigate } from 'react-router-dom';

import NavBar from '@components/NavBar/NavBar';

export default function SettingsMobile() {
  const navigate = useNavigate();
  return (
    <div className="my-10 grid h-screen grid-cols-1 grid-rows-[1fr_3em]">
      <div className="mx-8">
        <div className="flex flex-row">
          <span onClick={() => navigate('/chat')} className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">
            arrow_back_ios_new
          </span>
          <h1 className="font-semibold text-2xl">Settings</h1>
        </div>
        <div className="mt-3">
          <div
            onClick={() => navigate('/user/settings/general')}
            className="my-1 rounded p-2 text-lg flex flex-row justify-between">
            <div>
              <span className="material-symbols-outlined align-bottom text-slate-700 mr-1">person</span>General
            </div>
            <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
          </div>
          <hr />
          <div
            onClick={() => navigate('/user/settings/preferences')}
            className="my-1 rounded p-2 text-lg flex flex-row justify-between">
            <div>
              <span className="material-symbols-outlined align-bottom text-slate-700 mr-1">palette</span>Preferences
            </div>
            <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
          </div>
          <hr />
          <div
            onClick={() => navigate('/user/settings/security')}
            className="my-1 rounded p-2 text-lg flex flex-row justify-between">
            <div>
              <span className="material-symbols-outlined align-bottom text-slate-700 mr-1">lock</span>Security
            </div>
            <span className="material-symbols-outlined text-xl align-bottom text-slate-700">arrow_forward_ios</span>
          </div>
          <hr />
          <div
            onClick={() => navigate('/user/settings/dangerzone')}
            className="my-1 rounded p-2 text-lg flex flex-row justify-between">
            <div>
              <span className="material-symbols-outlined align-bottom text-slate-700 mr-1">warning</span>Danger Zone
            </div>

            <span className="material-symbols-outlined text-xl align-bottom text-slate-700">arrow_forward_ios</span>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
