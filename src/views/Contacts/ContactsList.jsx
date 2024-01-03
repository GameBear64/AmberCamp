import { useState } from 'react';
import { useEffect } from 'react';

import UserCard from './UserCard';

export default function ContactsList({ list, type, children }) {
  const [data, setData] = useState(list);

  const onSearch = (e) => setData(list?.filter((el) => el.handle.includes(e.target.value)));

  useEffect(() => {
    setData(list);
  }, [list]);

  return (
    <div className="mx-2">
      <input
        onChange={onSearch}
        className="my-4 h-10 w-full rounded-lg border-2 border-gray-300 px-5 text-sm focus:outline-none"
        placeholder="Search"
      />

      {children}
      {data?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}

      {data?.length < 1 && <p className="text-center font-semibold">No results found...</p>}
    </div>
  );
}
