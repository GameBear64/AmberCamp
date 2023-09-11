import { useNavigate } from 'react-router-dom';

import TopBar from '../../../components/TopBar/TopBar';
// TODO: fix when BE is ready
export default function PreferencesMobile() {
  const navigate = useNavigate();
  return (
    <div>
      <TopBar backBtnLable="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
    </div>
  );
}
