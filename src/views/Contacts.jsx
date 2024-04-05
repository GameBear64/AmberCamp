import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@layout';

import ContactsList from '@components/Contacts/ContactsList';
import Pending from '@components/Contacts/Pending';

import { ContactType } from '@utils/enums/contacts';
import useFetch from '@utils/useFetch';

import { ContactsOptions } from '../utils/enums/contacts';

export default function Contacts() {
  const [contactList, setContactList] = useState({});
  const [currentList, setCurrentList] = useState(ContactType.Friends);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setContactList(res));
  }, []);

  return (
    <Layout right={<Outlet />}>
      <div>
        <div className="my-2 flex w-full justify-evenly ">
          {ContactsOptions.map((option) => {
            return (
              <button
                key={option}
                className={`m-2 flex justify-center font-semibold text-txtPrimary ${
                  currentList === ContactType[option] && 'border-b-[3px] border-primary'
                }`}
                onClick={() => setCurrentList(ContactType[option])}>
                {option}
              </button>
            );
          })}
        </div>
        {currentList === ContactType.Friends && <ContactsList list={contactList?.contacts} type="friends" />}
        {currentList === ContactType.Pending && (
          <Pending incoming={contactList?.pendingContacts} outgoing={contactList?.sentOut} type="incoming" />
        )}
        {currentList === ContactType.Blocked && <ContactsList list={contactList?.blocked} type="blocked" />}
      </div>
    </Layout>
  );
}
