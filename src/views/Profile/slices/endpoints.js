import { getUserId } from '../../../stores/user';
import { successSnackBar } from '../../../utils/snackbars';
import { useFetch } from '../../../utils/useFetch';

export const getUser = (id) => {
  return useFetch({
    url: `user/${id || getUserId()}`,
    method: 'GET',
  });
};

export const updateDescription = (description) => {
  useFetch({
    url: 'user/settings',
    method: 'PATCH',
    body: { description },
  }).then((res) => {
    if (res.status === 200) {
      successSnackBar('Profile updated.');
    }
  });
};
