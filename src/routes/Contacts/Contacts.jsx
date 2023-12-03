import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import Layout from '@layout';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

import ContactsList from './ContactsList';

const ContactType = Object.freeze({
  Friends: 'Friends',
  PendingIn: 'PendingIn',
  PendingOut: 'PendingOut',
  Blocked: 'Blocked',
});

export default function Contacts() {
  const [contactList, setContactList] = useState({});
  const [currentList, setCurrentList] = useState(ContactType.Friends);

  let { id } = useParams();

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then(({ message }) => setContactList(message));
  }, []);

  useEffect(() => {
    const isPendingOpened = contactList?.pendingContacts?.find((chat) => chat._id == id);
    if (isPendingOpened) setCurrentList(ContactType.PendingIn);

    const isSentOpened = contactList?.sentOut?.find((chat) => chat._id == id);
    if (isSentOpened) setCurrentList(ContactType.PendingOut);

    const isBlockedOpened = contactList?.blocked?.find((chat) => chat._id == id);
    if (isBlockedOpened) setCurrentList(ContactType.Blocked);
  }, [id, contactList]);

  return (
    <Layout
      left={
        <div className="chats flex flex-col">
          <Link to={`/contacts/${getCurrentUserId()}`} className="p-2 text-xl">
            <span className="material-symbols-outlined mr-2 align-middle">person</span>My profile
          </Link>
          <div className="my-2 flex w-full justify-evenly border-2">
            <button
              className={`material-symbols-outlined p-2 ${currentList === ContactType.Friends ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ContactType.Friends)}>
              group
            </button>
            <button
              className={`material-symbols-outlined p-2 ${currentList === ContactType.PendingIn ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ContactType.PendingIn)}>
              mark_email_unread
            </button>
            <button
              className={`material-symbols-outlined p-2 ${currentList === ContactType.PendingOut ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ContactType.PendingOut)}>
              forward_to_inbox
            </button>
            <button
              className={`material-symbols-outlined p-2 ${currentList === ContactType.Blocked ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ContactType.Blocked)}>
              block
            </button>
          </div>
          {currentList === ContactType.Friends && <ContactsList label="Friends" list={contactList?.contacts} />}
          {currentList === ContactType.PendingIn && <ContactsList label="Pending" list={contactList?.pendingContacts} />}
          {currentList === ContactType.PendingOut && <ContactsList label="Sent out" list={contactList?.sentOut} />}
          {currentList === ContactType.Blocked && <ContactsList label="Blocked" list={contactList?.blocked} />}
        </div>
      }
      right={<Outlet />}
    />
  );
}
