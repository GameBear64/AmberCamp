import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@layout';

import useFetch from '@utils/useFetch';

import { ContactType } from './slice/enums';
import Pending from './slice/Pending';
import ContactsList from './ContactsList';

export default function Contacts() {
  const [contactList, setContactList] = useState({});
  const [currentList, setCurrentList] = useState(ContactType.Friends);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((message) => setContactList(message));
  }, []);

  return (
    <Layout
      left={
        <>
          <div className="mb-2 flex w-full justify-evenly ">
            <button
              className={`m-2 flex justify-center text-[16px] font-semibold ${
                currentList === ContactType.Friends && 'border-b-[3px] border-yellow-400'
              }`}
              onClick={() => setCurrentList(ContactType.Friends)}>
              Friends
            </button>

            <button
              className={`m-2 flex justify-center text-[16px] font-semibold ${
                currentList === ContactType.Pending && 'border-b-[3px] border-yellow-400'
              }`}
              onClick={() => setCurrentList(ContactType.Pending)}>
              Pending
            </button>

            <button
              className={`m-2 flex justify-center text-[16px] font-semibold ${
                currentList === ContactType.Blocked && 'border-b-[3px] border-yellow-400'
              }`}
              onClick={() => setCurrentList(ContactType.Blocked)}>
              Blocked
            </button>
          </div>
          {currentList === ContactType.Friends && <ContactsList list={contactList?.contacts} type="friends" />}
          {currentList === ContactType.Pending && (
            <Pending incoming={contactList?.pendingContacts} outgoing={contactList?.sentOut} type="incoming" />
          )}
          {currentList === ContactType.Blocked && <ContactsList list={contactList?.blocked} type="blocked" />}
        </>
      }
      right={<Outlet />}
    />
  );
}
