import { useNavigate, useParams } from 'react-router-dom';

import { successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

export default function FriendshipButtons({ userInfo, setUserInfo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const add = () => {
    useFetch({
      url: `user/friend/add/${id}`,
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Friend request send');
        setUserInfo((prev) => ({ ...prev, status: 'Pending' }));
      }
    });
  };

  const cancel = () => {
    useFetch({
      url: `user/friend/remove/${id}`,
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Request canceled');
        setUserInfo((prev) => ({ ...prev, status: 'Strangers' }));
      }
    });
  };

  const block = () => {
    useFetch({
      url: `user/friend/block/${id}`,
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('User blocked');
        setUserInfo((prev) => ({ ...prev, status: 'Blocked' }));
      }
    });
  };

  const unblock = () => {
    useFetch({
      url: `user/friend/unblock/${id}`,
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('User unblocked');
        setUserInfo((prev) => ({ ...prev, status: 'Strangers' }));
      }
    });
  };

  if (id !== getCurrentUserId()) {
    return (
      <div className="float-left mb-4 flex w-full flex-wrap gap-2 font-semibold ">
        {userInfo.status == 'Strangers' && (
          <button className="btn border-blue-500 text-blue-500 hover:border-blue-800" onClick={add}>
            Add friend
          </button>
        )}
        {userInfo.status == 'PendingIn' && (
          <button className="btn border-green-500 text-green-500 hover:border-green-800" onClick={add}>
            Accept Request
          </button>
        )}
        {userInfo.status == 'PendingOut' && (
          <button className="btn" onClick={cancel}>
            Cancel Request
          </button>
        )}
        {userInfo.status == 'Friends' && (
          <button className="btn border-green-500 text-green-500 hover:border-green-800" onClick={() => navigate(`/chat/${id}`)}>
            Message
          </button>
        )}
        {userInfo.status == 'Blocked' && (
          <button className="btn border-red-500 text-red-500 hover:border-red-800" onClick={unblock}>
            Unblock
          </button>
        )}
        {userInfo.status != 'Blocked' && (
          <button className="btn border-red-500 text-red-500 hover:border-red-800" onClick={block}>
            Block
          </button>
        )}
      </div>
    );
  }

  return <></>;
}
