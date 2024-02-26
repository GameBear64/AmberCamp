import { Link, useLocation } from 'react-router-dom';

import Layout from '@layout';

import TopBar from '@components/Layout/TopBar';

import { SettingsLinkIcons, SettingsLinks } from '@utils/enums/settings';

export default function Settings() {
  let { pathname } = useLocation();

  return (
    <Layout>
      <div className="mx-8 my-10 block lg:hidden">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="mt-2">
          {Object.entries(SettingsLinks).map((el) => (
            <div key={el[0]} className={`mb-2 ${pathname === `/settings/${el[0]}` && 'bg-slate-100'} rounded p-1 text-lg`}>
              <Link to={el[0]}>{el[1]}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <TopBar backBtnLable="Settings" backButton="arrow_back_ios_new" />
        <div className="mx-9 mt-4">
          {Object.entries(SettingsLinks).map((el) => (
            <Link key={el[0]} to={`${el[0]}`} className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div>
                <span className="material-symbols-outlined mr-1 align-bottom text-slate-700">{SettingsLinkIcons[el[1]]}</span>
                {el[1]}
              </div>
              <span className="material-symbols-outlined align-bottom text-xl text-slate-700">arrow_forward_ios</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
