import { useNavigate } from 'react-router-dom';

import NavBar from '@components/NavBar/NavBar';

import MobileNavBar from '../../../components/MobileNavBar/MobileNavBar';

export default function SettingsMobile() {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[1fr_3em]">
      <div>
        <MobileNavBar backBtnLable="Settings" backButton="arrow_back_ios_new" actionButton={() => navigate('/chat')} />
        <div className="mx-9">
          <div className="mt-4">
            <div
              onClick={() => navigate('/user/settings/general')}
              className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div>
                <span className="material-symbols-outlined mr-1 align-bottom text-slate-700">person</span>General
              </div>
              <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
            </div>
            <hr />
            <div
              onClick={() => navigate('/user/settings/preferences')}
              className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div>
                <span className="material-symbols-outlined mr-1 align-bottom text-slate-700">palette</span>Preferences
              </div>
              <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
            </div>
            <hr />
            <div
              onClick={() => navigate('/user/settings/security')}
              className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div>
                <span className="material-symbols-outlined mr-1 align-bottom text-slate-700">lock</span>Security
              </div>
              <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
            </div>
            <hr />
            <div
              onClick={() => navigate('/user/settings/dangerzone')}
              className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div>
                <span className="material-symbols-outlined mr-1 align-bottom text-slate-700">warning</span>Danger Zone
              </div>
              <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
