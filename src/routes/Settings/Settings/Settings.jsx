import { Link, Outlet, useLocation } from 'react-router-dom';

import Layout from '@layout';

export default function Settings() {
  let { pathname } = useLocation();

  return (
    <div>
      <Layout
        left={
          <div className="my-10">
            <div className="mx-8">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <div className="mt-2">
                <div className={`mb-2 ${pathname === '/user/settings/general' && 'bg-slate-100'} rounded p-1 text-lg`}>
                  <Link to={`general`}>General</Link>
                </div>
                <div className={`mb-2 ${pathname === '/user/settings/preferences' && 'bg-slate-100'} rounded p-1 text-lg`}>
                  <Link to={`preferences`}>Preferences</Link>
                </div>
                <div className={`mb-2 ${pathname === '/user/settings/security' && 'bg-slate-100'} rounded p-1 text-lg`}>
                  <Link to={`security`}>Security</Link>
                </div>
                <div className={`mb-2 ${pathname === '/user/settings/dangerzone' && 'bg-slate-100'} rounded p-1 text-lg`}>
                  <Link to={`dangerzone`}>Danger Zone</Link>
                </div>
              </div>
            </div>
          </div>
        }
        right={<Outlet />}
      />
    </div>
  );
}
