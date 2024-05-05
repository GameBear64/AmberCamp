import { useState } from 'react';

import { ContactType } from '@utils/enums/contacts';

import ContactsList from './ContactsList';

export default function Pending({ incoming, outgoing, type }) {
  const [pendingType, setPendingType] = useState(type);

  const secondaryButtons = () => (
    <div className="mx-7 mb-4 mt-1 flex flex-row justify-between gap-2 text-base font-semibold">
      <button
        className={`rounded bg-base px-2 py-1 text-txtPrimary ${pendingType === ContactType.Incoming && 'bg-base-m'}`}
        onClick={() => setPendingType(ContactType.Incoming)}>
        Incoming
      </button>

      <button
        className={`rounded bg-base px-2 py-1 text-txtPrimary ${pendingType === ContactType.Outgoing && 'bg-base-m'}`}
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
