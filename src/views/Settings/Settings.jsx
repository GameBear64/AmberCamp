import { Link, useLocation } from 'react-router-dom';

import Layout from '@layout';

import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar/TopBar';
import { SettingsLinks } from '../../utils/enums/SettingsEnums';
import { SettingsLinkIcons } from '../../utils/enums/SettingsEnums';

export default function Settings() {
  let { pathname } = useLocation();

  return (
    <Layout>
      <div className="mx-8 my-10 block lg:hidden">
        <h1 className="text-2xl font-semibold text-txtPrimary">Settings</h1>
        <div className="mt-2">
          {Object.entries(SettingsLinks).map((el) => (
            <div
              key={el[0]}
              className={`mb-2 ${pathname === `/settings/${el[0]}` && 'bg-base-m'} rounded p-1 text-lg text-txtPrimary`}>
              <Link to={el[0]}>{el[1]}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <TopBar backBtnLable="Settings" backButton="arrow_back_ios_new" />
        <div className="mx-9 mt-4 text-txtPrimary">
          {Object.entries(SettingsLinks).map((el) => (
            <Link key={el[0]} to={`${el[0]}`} className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div className="flex flex-row gap-3">
                <Icon styles="align-bottom text-xl" icon={SettingsLinkIcons[el[1]]} />
                {el[1]}
              </div>
              <Icon styles="align-bottom text-xl" icon="arrow_forward_ios" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
