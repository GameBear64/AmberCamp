import { Fragment, useState } from 'react';
import { useEffect } from 'react';

import Modal from '@components/Modal';

import { Form, Input } from '@form/Fields';

import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';

import UserCard from './../Cards/UserCard';

export default function SeparatedList({ list }) {
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setFriends(res.contacts));
  }, []);
  console.log(friends);

  if (showModal) {
    return (
      <Modal closeFunction={() => setShowModal(false)} title="New group" easyClose>
        <Form id="ask-form" onSubmit={(data) => {}} defaultValues={{}}>
          <div>
            <div>
              <Input placeholder="" name="name" label="Name of the group" />
              <div className="mt-5 flex flex-col">
                <label className="text-left font-semibold text-txtSecondary">Add friends to your group</label>
                <input onChange={() => {}} className="input" placeholder="Search" />
                <ul className="mt-2 flex w-full flex-col gap-1.5">
                  {friends.map((friend) => {
                    return (
                      <div key={friend._id} className="flex cursor-pointer items-center rounded bg-base-x p-2 hover:bg-base-m">
                        <img
                          className="h-11 w-11 rounded-full"
                          src={
                            friend?.picture && friend?.picture !== 'string'
                              ? `http://localhost:3030/recourse/${friend?.picture}?size=50`
                              : '../profilePic.jpeg'
                          }
                        />
                        <div className="flex w-full flex-row justify-between">
                          <div className="ml-2 flex flex-col">
                            <p className="text-sm font-bold leading-snug text-txtPrimary">{friend?.name || friend?.handle}</p>
                            <p className="text-xs leading-snug text-txtSecondary">@{friend?.handle}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div></div>
          </div>
        </Form>
        <Fragment key="buttons">
          <button className="plain-btn" onClick={() => {}}>
            Close
          </button>
          <button type="submit" form="ask-form" className="btn">
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
