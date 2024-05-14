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
      <input onChange={onSearch} className="soft-input" placeholder="Search" />
      <div className="flex flex-row justify-center md:max-w-md">{children}</div>
      {contacts?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}
      {contacts?.length < 1 && <p className="text-center font-semibold text-txtPrimary">No results found...</p>}
    </div>
  );
}
