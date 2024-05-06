import { useState } from 'react';
import { useEffect } from 'react';

import { useStore } from '@nanostores/react';

import Modal from '@components/Modal';

import { Form, Input } from '@form/Fields';

import { colors, groupIcons } from '@utils/enums/chat';
import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';
import { $user } from '@stores/user';

import Icon from '../../components/Icon';
import socket from '../../utils/socket';
import RoundButton from '../RoundButton';

import UserCard from './../Cards/UserCard';

export default function SeparatedList({ list }) {
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [shoParticipans, setShowParticipants] = useState(false);
  const [chosenIcon, setChosenIcon] = useState(groupIcons[Math.round(Math.random() * groupIcons.length)]);
  const [addedFriends, setAddedFrienda] = useState([]);
  const [chosenColor, setChosenColor] = useState(colors[Math.round(Math.random() * colors.length)]);
  const [title, setTitle] = useState('');
  const user = useStore($user);
  const [show, setShow] = useState(false);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setFriends(res.contacts));
  }, []);
  const createGroup = (data) => {
    socket.emit('group/create', data);
  };
  if (showModal) {
    return (
      <Modal
        closeFunction={() => {
          setShowModal(false);
          setShowParticipants(false);
          addedFriends([]);
        }}
        title="New group"
        easyClose>
        <Form id="ask-form" onSubmit={(data) => setTitle(data)} defaultValues={{}}>
          <div className="relative flex flex-col gap-2">
            <Input name="name" label="Name of the group" />
            <div className="mb-5">
              <p className="py-3 text-left font-semibold text-txtSecondary">Appearance</p>
              <div className="flex flex-row justify-between">
                <button className={`accent-circle size-40 ${chosenColor}`}>
                  <span className="material-symbols-rounded cursor-pointer text-8xl text-base-x">{chosenIcon}</span>
                </button>
                <div className="relative flex flex-col gap-2">
                  <div className="container m-auto grid grid-cols-5 gap-2">
                    {colors.map((el) => {
                      return (
                        <RoundButton
                          key={el}
                          onClick={() => setChosenColor(el)}
                          colors={`${el} rounded ${chosenColor === el && 'border-txtPrimary border-4'}`}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <button onClick={() => setShow(!show)} className="btn w-full">
                      Pick an icon
                    </button>
                    {show && (
                      <div className="absolute mt-2 flex flex-wrap gap-3 overflow-y-clip rounded shadow-md">
                        <div className="flex flex-wrap gap-2 bg-base-m">
                          {groupIcons.map((el) => {
                            return (
                              <RoundButton
                                onClick={() => setChosenIcon(el)}
                                key={el}
                                colors={`rounded ${el === chosenIcon && 'bg-primary text-base-x'}`}
                                icon={el}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {shoParticipans && (
              <div className="absolute flex size-full flex-col gap-2 bg-base">
                <div className="flex size-full max-h-[80vh] w-full flex-row gap-4 overflow-y-auto">
                  <div className="w-full overflow-y-auto">
                    <label className="text-left font-semibold text-txtSecondary">Add friends to your group</label>
                    <input onChange={() => {}} value={() => {}} className="input mb-1" placeholder="Search" />
                    <ul className="mt-2 flex w-full flex-col gap-1.5">
                      {friends.map((friend) => {
                        return (
                          <div
                            key={friend._id}
                            onClick={() => {
                              setAddedFrienda([friend, ...addedFriends]);
                              setFriends(friends.filter((el) => el !== friend));
                            }}
                            className="flex cursor-pointer items-center rounded bg-base-x p-2 hover:bg-base-m">
                            <img
                              className="size-11 rounded-full"
                              src={
                                friend?.picture && friend?.picture !== 'string'
                                  ? `http://localhost:3030/recourse/${friend?.picture}?size=50`
                                  : '../profilePic.jpeg'
                              }
                            />
                            <div className="ml-2 flex w-full flex-col justify-between">
                              <p className="text-sm font-bold leading-snug text-txtPrimary">{friend?.name || friend?.handle}</p>
                              <p className="text-xs leading-snug text-txtSecondary">@{friend?.handle}</p>
                            </div>
                            <Icon icon="person_add" />
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="w-full overflow-y-auto">
                    <label className="text-left font-semibold text-txtSecondary">Added friends</label>
                    <ul className="mt-2 flex w-full flex-col gap-1.5">
                      {addedFriends.map((friend) => {
                        return (
                          <div
                            key={friend._id}
                            onClick={() => {
                              setFriends([friend, ...friends]);
                              setAddedFrienda(addedFriends.filter((el) => el !== friend));
                            }}
                            className="flex cursor-pointer items-center rounded bg-base-x p-2 hover:bg-base-m">
                            <img
                              className="size-11 rounded-full"
                              src={
                                friend?.picture && friend?.picture !== 'string'
                                  ? `http://localhost:3030/recourse/${friend?.picture}?size=50`
                                  : '../profilePic.jpeg'
                              }
                            />
                            <div className="ml-2 flex w-full flex-col justify-between">
                              <p className="text-sm font-bold leading-snug text-txtPrimary">{friend?.name || friend?.handle}</p>
                              <p className="text-xs leading-snug text-txtSecondary">@{friend?.handle}</p>
                            </div>
                            <Icon styles="text-green-600" icon="how_to_reg" />
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-end gap-4" key="buttons">
                  <button
                    className="plain-btn"
                    onClick={() => {
                      setShowParticipants(false);
                      setFriends([...addedFriends, ...friends]);
                      setAddedFrienda([]);
                    }}>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowParticipants(false);
                    }}
                    type="submit"
                    className="btn">
                    Save
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <p>{addedFriends.length} patricipants</p>
              <div>
                <button onClick={() => setShowParticipants(true)} className="btn">
                  Edit participants
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-4" key="buttons">
              <button className="plain-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log({
                    title: title?.name,
                    participants: [...addedFriends.map((el) => el._id)],
                    color: chosenColor,
                    icon: chosenIcon,
                  });
                  createGroup({
                    title: title?.name,
                    participants: [...addedFriends.map((el) => el._id), user.id],
                    color: chosenColor,
                    icon: chosenIcon,
                  });
                }}
                type="submit"
                form="ask-form"
                className="btn">
                Create
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }

  if (list?.length < 1)
    return (
      <div className="flex flex-col">
        <button onClick={() => setShowModal(!showModal)} className="btn my-5">
          Create a new group
        </button>
      </div>
    );

  return list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({ user }) => user._id !== getUserId());
      return <UserCard contact={otherUser?.user} status="friends" key={conversation._id} />;
    } else {
      return (
        <UserCard
          contact={{
            handle: 'catxrin',
            name: 'catxrin',
            picture: 'XGvA8cUoe3QedMNOVhgckjBcvbSb7MKSUnM49p8TLVTCWFBsDN',
            _id: '64e4756bd4cd2de8e9f5441e',
          }}
          status="friends"
          key={conversation._id}
        />
      );
    }
  });
}
