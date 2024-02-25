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
        className="my-4 h-10 w-full rounded-lg border-2 border-gray-300 px-5 text-sm focus:outline-none lg:max-w-md"
        placeholder="Search"
      />
      <div className="flex flex-row justify-center lg:max-w-md">{children}</div>
      {data?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}

      {data?.length < 1 && <p className="text-center font-semibold">No results found...</p>}
    </div>
  );
}
// {/* <div className="mx-2 flex w-full flex-col items-center justify-center">
// <input
//   onChange={onSearch}
//   className="my-4 flex h-10 w-full rounded-lg border-2 border-gray-300 px-5 text-sm focus:outline-none lg:max-w-md"
//   placeholder="Search"
// />
// <div className="flex w-full flex-row justify-center">{children}</div>
// <div className="flex w-full flex-col p-2 lg:px-5">
//   {data?.map((contact, i) => (
//     <UserCard contact={contact} status={type} key={i} />
//   ))}

//   {data?.length < 1 && <p className="text-center font-semibold">No results found...</p>}
// </div>
// </div> */}
