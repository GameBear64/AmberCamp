import { useState } from 'react';

import { ContactType } from '@utils/enums/ContactEnums';

import ContactsList from './ContactsList';

export default function Pending({ incoming, outgoing, type }) {
  const [pendingType, setPendingType] = useState(type);

  const secondaryButtons = () => (
    <div className="mx-7 mb-4 mt-1 flex flex-row justify-between gap-2 text-[16px] font-semibold">
      <button
        className={`rounded px-2 py-1 ${pendingType === ContactType.Incoming && 'shadow-primary'}`}
        onClick={() => setPendingType(ContactType.Incoming)}>
        Incoming
      </button>

      <button
        className={`rounded px-2 py-1 ${pendingType === ContactType.Outgoing && 'shadow-primary'}`}
        onClick={() => setPendingType(ContactType.Outgoing)}>
        Outgoing
      </button>
    </div>
  );

  return (
    <>
      {pendingType === ContactType.Incoming && (
        <ContactsList list={incoming} type="pending">
          {secondaryButtons()}
        </ContactsList>
      )}

      {pendingType === ContactType.Outgoing && (
        <ContactsList list={outgoing} type="pending">
          {secondaryButtons()}
        </ContactsList>
      )}
    </>
  );
}
