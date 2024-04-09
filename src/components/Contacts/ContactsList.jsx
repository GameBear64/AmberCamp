import { useState } from 'react';
import { useEffect } from 'react';

import UserCard from '../Cards/UserCard';

export default function ContactsList({ list, type, children }) {
  const [contacts, setContacts] = useState(list);

  const onSearch = (e) => setContacts(list?.filter((el) => el.handle.includes(e.target.value)));

  useEffect(() => {
    setContacts(list);
  }, [list]);

  return (
    <div className="mx-2">
      <input
        onChange={onSearch}
        className="my-4 h-10 w-full rounded-lg bg-base-m px-5 text-sm text-txtPrimary focus:outline-none lg:max-w-md"
        placeholder="Search"
      />
      <div className="flex flex-row justify-center lg:max-w-md">{children}</div>
      {contacts?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}
      {contacts?.length < 1 && <p className="text-center font-semibold text-txtPrimary">No results found...</p>}
    </div>
  );
}
