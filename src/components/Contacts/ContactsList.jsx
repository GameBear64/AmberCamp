import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/Icon';

import useFetch from '../../utils/useFetch';
import ParticipantsCard from '../Cards/ParticipantsCard';
import UserCard from '../Cards/UserCard';
import Modal from '../Modal';
export default function ContactsList({ list, type, children }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState(list);
  const [showModal, setShowModal] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    setContacts(list);
  }, [list]);

  useEffect(() => {
    if (term.length > 0) useFetch({ url: `user/search/${term}` }).then((data) => setUsers(data));
  }, [term]);
  const onSearch = (e) => {
    setTerm(e.target.value);
  };
  return (
    <div className="mx-2">
      <div className="flex flex-row items-center gap-2">
        <input onChange={onSearch} className="soft-input" placeholder="Search" />
        <Icon onClick={() => setShowModal(true)} styles="btn" icon="person_search" />
      </div>
      <div className="flex flex-row justify-center md:max-w-md">{children}</div>
      {contacts?.map((contact, i) => (
        <UserCard contact={contact} status={type} key={i} />
      ))}
      {contacts?.length < 1 && <p className="text-center font-semibold text-txtPrimary">No results found...</p>}
      {showModal && (
        <Modal easyClose title="Search for users" closeFunction={() => setShowModal(false)}>
          <div className="flex flex-col gap-2">
            <div className="w-full overflow-y-auto">
              <input onChange={onSearch} className="input mb-1" placeholder="Search" />
              <ul className="mt-2 flex w-full flex-col gap-1.5">
                {term.length < 1 || users.length < 1 ? (
                  <p className="font-semibold text-txtPrimary">No results found...</p>
                ) : (
                  users?.map((user) => (
                    <ParticipantsCard
                      key={user._id}
                      friend={user}
                      onClick={() => {
                        setShowModal(false);
                        setTerm('');
                        navigate(user._id);
                      }}
                    />
                  ))
                )}
              </ul>
            </div>
            <div className="flex justify-end gap-4" key="buttons">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
