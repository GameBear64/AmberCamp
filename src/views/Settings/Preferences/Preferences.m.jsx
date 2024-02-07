import { useNavigate } from 'react-router-dom';

import MobileNavBar from '../../../components/NavBar/MobileNavBar';
// TODO: fix when BE is ready
export default function PreferencesMobile() {
  const navigate = useNavigate();
  return (
    <div>
      <MobileNavBar backBtnLable="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
    </div>
  );
}
