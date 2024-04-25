import { Fragment, useState } from 'react';
import { useEffect } from 'react';

import Modal from '@components/Modal';

import { Form, Input, MultiSelect } from '@form/Fields';

import socket from '@utils/socket';
import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';

import UserCard from './../Cards/UserCard';

export default function SeparatedList({ list }) {
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const testCreate = () => {
    // socket.emit('group/create', {
    //   title: 'new group',
    //   participants: ['64eeff959d98879f70171f68'],
    //   color: 'dfgs',
    //   icon: 'dfghjk',
    // });
  };
  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setFriends(res.contacts));
  }, []);
  console.log(friends);

  if (showModal) {
    return (
      <Modal closeFunction={() => setShowModal(false)} title="New group" easyClose>
        <Form
          id="ask-form"
          onSubmit={(data) => {
            console.log(data);
          }}>
          <div>
            <div>
              <Input placeholder="" name="name" label="Name of the group" />
              <div className="mt-5 flex flex-col">
                {/* <label className="text-left font-semibold text-txtSecondary">Add friends to your group</label> */}
                <MultiSelect name="participants" label="Participants" options={friends} styles="mt-2 mx-auto" />

                {/* <Input onChange={() => {}} className="input" name="participants" placeholder="Search" />
                <ul className="mt-2 flex w-full flex-col">
                  {friends.map((friend) => {
                    return (
                      <div
                        key={friend._id}
                        onClick={() => setSelectedFriends((prev) => [...prev, friend._id])}
                        className={`flex cursor-pointer items-center p-2 hover:bg-base-m ${
                          selectedFriends.find((el) => el === friend._id) ? 'bg-base-m ' : 'bg-base-x'
                        }`}>
                        <img
                          className="h-11 w-11 rounded-full"
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
                      </div>
                    );
                  })}
                </ul> */}
              </div>
            </div>
          </div>
        </Form>
        <Fragment key="buttons">
          <button className="plain-btn" onClick={() => {}}>
            Close
          </button>
          <button onClick={testCreate} type="submit" form="ask-form" className="btn">
            Create
          </button>
        </Fragment>
      </Modal>
    );
  }
  if (list?.length < 1)
    return (
      <div className="flex flex-col">
        <button onClick={() => setShowModal(!showModal)} className="btn my-5">
          Create a new group
        </button>
        {/* <UserCard
          contact={{
            handle: 'catxrin',
            name: 'catxrin',
            picture: 'XGvA8cUoe3QedMNOVhgckjBcvbSb7MKSUnM49p8TLVTCWFBsDN',
            _id: '64e4756bd4cd2de8e9f5441e',
          }}
          status="friends"
        /> */}
      </div>
    );

  return list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({ user }) => user._id !== getUserId());
      return <UserCard contact={otherUser.user} status="friends" key={conversation._id} />;
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
