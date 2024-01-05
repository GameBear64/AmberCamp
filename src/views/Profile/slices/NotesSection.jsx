import { useState } from 'react';

import Notes from '@components/Notes/Notes';
import Form from '@form';
import ButtonInputField from '@form-inputs/ButtonInput';
import { errorSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { removeEmptyProperties } from '@utils/utils';

import Icon from '../../../components/Icon';

import { getUser } from './endpoints';

export default function NotesSection({ id, userInfo, setUserInfo }) {
  const [editNote, setEditNote] = useState('');
  const [rotate, setRotate] = useState(false);

  const updateUser = (updateObject) => {
    useFetch({
      url: `user/${id}`,
      method: 'POST',
      body: removeEmptyProperties(updateObject),
    }).then(() => {
      getUser(id).then((res) => setUserInfo(res.message));
    });
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-semibold">
        Notes
        <Icon
          icon="sort"
          onClick={() => {
            updateUser({ notes: userInfo?.notes.reverse() });
            setRotate(!rotate);
          }}
          styles={`mb-1 ml-2 align-bottom ${rotate && 'rotate-180'}`}
        />
      </h1>
      <Form
        defaultValues={{ noteField: editNote }}
        onSubmit={(data) => {
          if (!data.noteField) return errorSnackBar("Note can't be empty");
          updateUser({ notes: [data.noteField, ...userInfo.notes] });
          setEditNote('');
        }}>
        <ButtonInputField name="noteField" btnText="+Add" width="w-full" />
      </Form>
      {userInfo?.notes?.map((note, i) => (
        <Notes
          key={i}
          text={note}
          onDelete={() => updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) })}
          onEdit={() => {
            updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
            setEditNote(note);
          }}
        />
      ))}
    </div>
  );
}