// TODO: remove when BE is ready
/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar/TopBar';
export default function Preferences() {
  const navigate = useNavigate();

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
  // const changeUserTheme = () => {
  //   useFetch({
  //     url: 'user/settings/preferences',
  //     method: 'PATCH',
  //     body: {
  //       theme: userPreferences.theme,
  //       accent: userPreferences.accent ?? 'string',
  //       language: userPreferences.language,
  //     },
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       console.log(res.message);
  //     } else {
  //       // For the devs to debug
  //       console.log(res.message);
  //     }
  //   });
  // };

  return (
    <>
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      this will be the place for themes, etc.
    </>
  );
}
