import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import ContactsList from '@components/Contacts/ContactsList';
import Pending from '@components/Contacts/Pending';
import Layout from '@layout';
import { ContactType } from '@utils/enums/ContactEnums';
import useFetch from '@utils/useFetch';

export default function Contacts() {
  const [contactList, setContactList] = useState({});
  const [currentList, setCurrentList] = useState(ContactType.Friends);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then(({ message }) => setContactList(message));
  }, []);

  return (
    <Layout right={<Outlet />}>
      <>
        <div className="my-2 flex w-full justify-evenly ">
          <button
            className={`m-2 flex justify-center text-[16px] font-semibold text-txtPrimary ${
              currentList === ContactType.Friends && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ContactType.Friends)}>
            Friends
          </button>

          <button
            className={`m-2 flex justify-center text-[16px] font-semibold text-txtPrimary ${
              currentList === ContactType.Pending && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ContactType.Pending)}>
            Pending
          </button>

          <button
            className={`m-2 flex justify-center text-[16px] font-semibold text-txtPrimary ${
              currentList === ContactType.Blocked && 'border-b-[3px] border-primary'
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
    </Layout>
  );
}
