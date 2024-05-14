import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/Icon';
import TopBar from '@components/Layout/TopBar';

import { ButtonField, Form } from '@form/Fields';

import useFetch from '@utils/useFetch';
import { clearAll } from '@utils/utils';

export default function DangerZone() {
  let [active, setActive] = useState('');
  const navigate = useNavigate();

  const deleteUser = ({ password }) => {
    useFetch({
      url: 'user',
      method: 'DELETE',
      body: { password },
    });
    clearAll();
  };
  return (
    <div>
      <div className="block md:hidden">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="p-10">
        <button
          onClick={() => {
            clearAll();
            navigate('/login');
          }}
          className="btn my-4 block bg-red-600 hover:bg-red-700">
          <Icon styles="mr-2 align-bottom text-white" icon="move_item" />
          Log out
        </button>

        {/* <hr className="block lg:hidden" /> */}

        {active ? (
          <Form onSubmit={(data) => deleteUser(data)}>
            <ButtonField btnColor="bg-red-600" btnText="Delete Account" name="password" type="password" />
            <label className="mb-1">Please, enter your password to proceed.</label>
          </Form>
        ) : (
          <button onClick={() => setActive(!active)} className="btn bg-red-600 hover:bg-red-700">
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
