import { useState } from 'react';

import Modal from '@components/Modal';

import { ColorPicker, Form, IconPicker, Input } from '@form/Fields';
import { REQUIRED } from '@form/validations';

import { colors, groupIcons } from '@utils/enums/chat';

import socket from '../../utils/socket';
import ParticipantsCard from '../Cards/ParticipantsCard';
import Icon from '../Icon';

export default function CreateGroup({ friends, setShowModal }) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [showedFriends, setShowedFriends] = useState(friends);
  const [chosenColor, setChosenColor] = useState(colors[Math.round(Math.random() * colors.length)]);
  const [chosenIcon, setChosenIcon] = useState(groupIcons[Math.round(Math.random() * groupIcons.length)]);
  const [addedFriends, setAddedFriends] = useState([]);

  const handleSaveGroup = (data) => {
    socket.emit('group/create', data);
    setShowModal(false);
  };

  const onSearch = (e) =>
    setShowedFriends(
      friends?.filter((el) => {
        return el.handle.includes(e.target.value) && !addedFriends.some((friend) => friend.handle === el.handle);
      })
    );
  return (
    <Modal easyClose title="New group" closeFunction={() => setShowModal(false)}>
      <Form
        id="ask-form"
        defaultValues={{ color: chosenColor, icon: chosenIcon, participants: addedFriends.map((el) => el._id) }}
        onSubmit={handleSaveGroup}
        onChange={(d) => {
          setChosenColor(d.color);
          setChosenIcon(d.icon);
        }}>
        <div className="relative flex flex-col gap-2">
          <Input name="name" label="Name of the group" rules={{ ...REQUIRED }} />
          <p className="py-3 text-left font-semibold text-txtSecondary">Appearance</p>
          <div className="flex flex-row justify-between">
            <Icon icon={chosenIcon} styles={`accent-circle size-40 text-8xl text-base-x ${chosenColor}`} />
            <div className="relative flex flex-col gap-2">
              <ColorPicker name="color" colors={colors} />
              <IconPicker name="icon" icons={groupIcons} />
            </div>
          </div>
          {showParticipants && (
            <div className="absolute flex size-full flex-col gap-2 bg-base">
              <div className="flex size-full max-h-[80vh] w-full flex-row gap-4 overflow-y-auto">
                <div className="w-full overflow-y-auto">
                  <label className="text-left font-semibold text-txtSecondary">Add friends to your group</label>
                  <input onChange={onSearch} className="input mb-1" placeholder="Search" />
                  <ul className="mt-2 flex w-full flex-col gap-1.5">
                    {showedFriends?.map((friend) => (
                      <ParticipantsCard
                        key={friend._id}
                        friend={friend}
                        icon="person_add"
                        onClick={() => {
                          setAddedFriends([friend, ...addedFriends]);
                          setShowedFriends(showedFriends.filter((el) => el.handle !== friend.handle));
                        }}
                      />
                    ))}
                  </ul>
                </div>
                <div className="mt-2 flex w-full flex-col gap-1.5 overflow-y-auto">
                  <label className="text-left font-semibold text-txtSecondary">Added friends</label>
                  {addedFriends?.map((friend) => (
                    <ParticipantsCard
                      friend={friend}
                      key={friend._id}
                      icon="how_to_reg"
                      onClick={() => {
                        setAddedFriends(addedFriends.filter((el) => el !== friend));
                        setShowedFriends([...showedFriends, friend]);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row justify-end gap-4">
                <button
                  type="button"
                  className="plain-btn"
                  onClick={() => {
                    setShowedFriends(friends);
                    setAddedFriends([]);
                    setShowParticipants(false);
                  }}>
                  Go Back
                </button>
                <button type="button" onClick={() => setShowParticipants(false)} className="btn">
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p>{addedFriends.length + 1} participants</p>
            <button type="button" onClick={() => setShowParticipants(true)} className="btn flex self-start">
              Edit participants
            </button>
          </div>
          <div className="flex flex-row justify-end gap-4" key="buttons">
            <button type="button" className="plain-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" form="ask-form" className="btn">
              Create
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
