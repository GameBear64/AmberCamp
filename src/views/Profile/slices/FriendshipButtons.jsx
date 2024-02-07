import { useNavigate, useParams } from 'react-router-dom';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

export default function FriendshipButtons({ userInfo, setUserInfo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const add = () => {
    useFetch({
      url: `user/friend/add/${id}`,
      method: 'POST',
    }).then(() => {
      successSnackBar('Friend request send');
      setUserInfo((prev) => ({ ...prev, status: 'Pending' }));
    });
  };

  const cancel = () => {
    useFetch({
      url: `user/friend/remove/${id}`,
      method: 'POST',
    }).then(() => {
      successSnackBar('Request canceled');
      setUserInfo((prev) => ({ ...prev, status: 'Strangers' }));
    });
  };

  const block = () => {
    useFetch({
      url: `user/friend/block/${id}`,
      method: 'POST',
    }).then(() => {
      successSnackBar('User blocked');
      setUserInfo((prev) => ({ ...prev, status: 'Blocked' }));
    });
  };

  const unblock = () => {
    useFetch({
      url: `user/friend/unblock/${id}`,
      method: 'POST',
    }).then(() => {
      successSnackBar('User unblocked');
      setUserInfo((prev) => ({ ...prev, status: 'Strangers' }));
    });
  };

  if (id !== getCurrentUserId()) {
    return (
      <div className="float-left mb-4 flex w-full flex-wrap gap-2 font-semibold ">
        {userInfo.status == 'Strangers' && (
          <button className="btn-blue" onClick={add}>
            Add friend
          </button>
        )}
        {userInfo.status == 'PendingIn' && (
          <button className="btn-green" onClick={add}>
            Accept Request
          </button>
        )}
        {userInfo.status == 'PendingOut' && (
          <button className="btn-green" onClick={cancel}>
            Cancel Request
          </button>
        )}
        {userInfo.status == 'Friends' && (
          <button className="btn-green" onClick={() => navigate(`/chat/${id}`)}>
            Message
          </button>
        )}
        {userInfo.status == 'Blocked' && (
          <>
            <button className="btn-green" onClick={unblock}>
              Message History
            </button>
            <button className="btn-red" onClick={unblock}>
              Unblock
            </button>
          </>
        )}
        {userInfo.status != 'Blocked' && (
          <button className="btn-red" onClick={block}>
            Block
          </button>
        )}
      </div>
    );
  }
}
