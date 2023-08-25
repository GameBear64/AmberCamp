import { useNavigate } from 'react-router-dom';
export default function PreferencesMobile() {
  const navigate = useNavigate();
  return (
    <div className="my-10">
      <div className="mx-8">
        <div className="flex flex-row">
          <span onClick={() => navigate('/user/settings')} className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">
            arrow_back_ios_new
          </span>
          <h1 className="font-semibold text-2xl">Preferences</h1>
        </div>
      </div>
    </div>
  );
}
