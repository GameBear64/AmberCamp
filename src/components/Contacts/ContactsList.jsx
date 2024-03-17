import { useState } from 'react';
import { useEffect } from 'react';

import UserCard from '../Cards/UserCard';

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
        className="my-4 h-10 w-full rounded-lg bg-base-m px-5 text-sm text-txtPrimary focus:outline-none lg:max-w-md"
        placeholder="Search"
      />
      <div className="flex flex-row justify-center lg:max-w-md">{children}</div>
      {data?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}

      {data?.length < 1 && <p className="text-center font-semibold text-txtPrimary">No results found...</p>}
    </div>
  );
}
