import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/Icon';
import TopBar from '@components/Layout/TopBar';

import { ButtonField, Form } from '@form/Fields';

import useFetch from '@utils/useFetch';
import { removeUser } from '@stores/user';

export default function DangerZone() {
  let [active, setActive] = useState('');
  const navigate = useNavigate();

  const deleteUser = ({ password }) => {
    console.log('p', password);
    
    // useFetch({
    //   url: 'user',
    //   method: 'DELETE',
    //   body: { password },
    // });
  };
  return (
    <div className="p-10 lg:p-0">
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="lg:px-10 lg:py-8">
        <button
          onClick={() => {
            removeUser();
            navigate('/login');
          }}
          className="btn my-4 block">
          <Icon styles="mr-2 align-bottom text-white" icon="move_item" />
          Log out
        </button>

        <hr className="hidden lg:block" />

        {active ? (
          <Form onSubmit={(data) => deleteUser(data)}>
            <ButtonField
              btnText="Delete Account"
              name="password"
              type="password"
            />
            <label className="mb-1">Please, enter your password to proceed.</label>
          </Form>
        ) : (
          <button onClick={() => setActive(!active)} className="btn">
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
