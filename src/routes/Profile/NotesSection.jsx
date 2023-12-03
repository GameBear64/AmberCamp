import { useState } from 'react';

import Notes from '@components/Notes/Notes';
import Form from '@form';
import ButtonInputField from '@form-inputs/ButtonInput';
import { errorSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { removeEmptyProperties } from '@utils/utils';

export default function NotesSection({ id, styles, userInfo, refresh }) {
  const [editNote, setEditNote] = useState('');
  const [rotate, setRotate] = useState(false);

  const updateUser = (updateObject) => {
    useFetch({
      url: `user/${id}`,
      method: 'POST',
      body: removeEmptyProperties(updateObject),
    }).then(() => refresh());
  };

  return (
    <div className={styles}>
      <h1 className="text-2xl font-semibold">
        Notes
        <span
          onClick={() => {
            setRotate(!rotate);
            updateUser({ notes: userInfo?.notes.reverse() });
          }}
          className={`material-symbols-outlined mb-1 ml-2 cursor-pointer align-bottom ${rotate && 'rotate-180'}`}>
          sort
        </span>
      </h1>
      <Form
        defaultValues={{ noteField: editNote }}
        onSubmit={(data) => {
          if (!data.noteField) return errorSnackBar("Note can't be empty");
          updateUser({ notes: [...userInfo.notes, data.noteField] });
          setEditNote('');
        }}>
        <ButtonInputField name="noteField" btnText="+Add" width="w-70" />
      </Form>
      {userInfo?.notes?.map((note, i) => (
        <Notes
          key={i}
          text={note}
          onDelete={() => {
            updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
          }}
          onEdit={() => {
            setEditNote(note);
            updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
          }}
        />
      ))}
    </div>
  );
}
