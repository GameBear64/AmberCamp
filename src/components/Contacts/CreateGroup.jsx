import { useState } from 'react';

import { useStore } from '@nanostores/react';

import Modal from '@components/Modal';

import { ColorPicker, Form, Input } from '@form/Fields';
import { REQUIRED } from '@form/validations';

import { colors, groupIcons } from '@utils/enums/chat';
import { $user } from '@stores/user';

import socket from '../../utils/socket';
import ParticipantsCard from '../Cards/ParticipantsCard';
import Icon from '../Icon';
import RoundButton from '../RoundButton';

export default function CreateGroup({ friends, setFriends, setShowModal }) {
  const [show, setShow] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chosenColor, setChosenColor] = useState('bg-blue-500');
  const [chosenIcon, setChosenIcon] = useState(groupIcons[Math.round(Math.random() * groupIcons.length)]);
  const [addedFriends, setAddedFriends] = useState([]);
  const user = useStore($user);

  const cancel = () => {
    setShowModal(false);
    setShowParticipants(false);
    setAddedFriends([]);
  };

  const handleSaveGroup = (data) => {
    socket.emit('group/create', data);
    setShowModal(false);
  };

  // const onSearch = (e) => setContacts(friends?.filter((el) => el.handle.includes(e.target.value)));
  return (
    <Modal easyClose title="New group" closeFunction={() => setShowModal(false)}>
      <Form
        id="ask-form"
        defaultValues={{ color: chosenColor, icon: chosenIcon, participants: [...addedFriends.map((el) => el._id), user.id] }}
        onSubmit={handleSaveGroup}
        onChange={(d) => setChosenColor(d.color)}>
        <div className="relative flex flex-col gap-2">
          <Input name="name" label="Name of the group" rules={{ ...REQUIRED }} />
          <p className="py-3 text-left font-semibold text-txtSecondary">Appearance</p>
          <div className="flex flex-row justify-between">
            <Icon icon={chosenIcon} styles={`accent-circle size-40 text-8xl text-base-x ${chosenColor}`} />
            <div className="relative flex flex-col gap-2">
              <ColorPicker name="color" colors={colors} />
              <div>
                <button type="button" onClick={() => setShow(!show)} className="btn w-full">
                  Pick an icon
                </button>
                {show && (
                  <div className="absolute my-2 flex flex-wrap gap-2 overflow-y-clip rounded bg-base-m shadow-md">
                    {groupIcons.map((icon) => (
                      <RoundButton
                        key={icon}
                        icon={icon}
                        onClick={() => setChosenIcon(icon)}
                        colors={`rounded ${icon === chosenIcon && 'bg-primary text-base-x'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {showParticipants && (
            <div className="absolute flex size-full flex-col gap-2 bg-base">
              <div className="flex size-full max-h-[80vh] w-full flex-row gap-4 overflow-y-auto">
                <div className="w-full overflow-y-auto">
                  <label className="text-left font-semibold text-txtSecondary">Add friends to your group</label>
                  <input onChange={() => {}} className="input mb-1" placeholder="Search" />
                  <ul className="mt-2 flex w-full flex-col gap-1.5">
                    {friends.map((friend) => (
                      <ParticipantsCard
                        key={friend._id}
                        friend={friend}
                        icon="person_add"
                        onClick={() => {
                          setAddedFriends([friend, ...addedFriends]);
                          setFriends(friends.filter((el) => el !== friend));
                        }}
                      />
                    ))}
                  </ul>
                </div>
                <div className="mt-2 flex w-full flex-col gap-1.5 overflow-y-auto">
                  <label className="text-left font-semibold text-txtSecondary">Added friends</label>
                  {addedFriends.map((friend) => (
                    <ParticipantsCard
                      friend={friend}
                      key={friend._id}
                      icon="how_to_reg"
                      onClick={() => {
                        setFriends([friend, ...friends]);
                        setAddedFriends(addedFriends.filter((el) => el !== friend));
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row justify-end gap-4">
                <button className="plain-btn" onClick={cancel}>
                  Cancel
                </button>
                <button onClick={() => setShowParticipants(false)} type="submit" className="btn">
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
