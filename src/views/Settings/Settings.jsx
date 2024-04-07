import { Link, useLocation, useNavigate } from 'react-router-dom';

import Layout from '@layout';
import { useStore } from '@nanostores/react';

import { $user } from '@stores/user';

import Icon from '../../components/Icon';
import TopBar from '../../components/Layout/TopBar';
import { SettingsLinkIcons } from '../../utils/enums/settings';

import { SettingsLinks } from './../../utils/enums/settings';

export default function Settings() {
  let { pathname } = useLocation();
  const user = useStore($user);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-8 my-10 hidden lg:block">
        <h1 className="text-2xl font-semibold text-txtPrimary">Settings</h1>
        <div className="mt-2">
          {Object.entries(SettingsLinks).map((link) => (
            <div
              key={link[0]}
              className={`mb-2 ${pathname === `/settings/${link[0]}` && 'bg-base-m'} rounded p-1 text-lg text-txtPrimary`}>
              <Link to={link[0]}>{link[1]}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="block lg:hidden">
        <TopBar backBtnLabel="Settings" backButton="arrow_back_ios_new" />
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Settings" backButton="arrow_back_ios_new" actionButton={() => navigate(`/contacts/${user.id}`)} />
        <div className="mx-9 mt-4 text-txtPrimary">
          {Object.entries(SettingsLinks).map((link) => (
            <Link key={link[0]} to={`${link[0]}`} className="my-1 flex flex-row justify-between rounded p-2 text-lg">
              <div className="flex flex-row gap-3">
                <Icon styles="align-bottom text-xl" icon={SettingsLinkIcons[link[1]]} />
                {link[1]}
              </div>
              <Icon styles="align-bottom text-xl" icon="arrow_forward_ios" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
