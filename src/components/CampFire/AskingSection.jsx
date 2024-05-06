import { Fragment, useState } from 'react';

import QuestionBubble from '@components/CampFire/QuestionBubble';
import Modal from '@components/Modal';

import { CheckBox, Form, Input, Textarea } from '@form/Fields';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

export default function AskingSection({ asked, set }) {
  const [askModalShown, setAskModalShown] = useState(false);

  console.log(asked);

  const askTheQuestion = (data) => {
    useFetch({
      url: 'campfire/new',
      method: 'POST',
      body: { question: data.question, anonymous: data.anonymous, category: 'General' },
    }).then((res) => {
      set((prev) => prev.asked.push(res));
      successSnackBar('Question asked');
      setAskModalShown(false);
    });
  };

  return (
    <div className="flex flex-col">
      <button className="btn my-5" onClick={() => setAskModalShown(true)}>
        Ask question
      </button>
      {askModalShown && (
        <Modal closeFunction={() => setAskModalShown(false)} title="New question..." easyClose>
          <Form id="ask-form" onSubmit={(data) => askTheQuestion(data)} defaultValues={{ anonymous: true }}>
            <Input placeholder="What if..." name="title" label="Title" />
            <Textarea rows="4" label="Question" name="question" placeholder="So I was wondering..." styles="my-2" />
            <CheckBox label="Anonymous question?" name="anonymous" styles="my-4" />
          </Form>
          <Fragment key="buttons">
            <button className="plain-btn" onClick={() => setAskModalShown(false)}>
              Close
            </button>
            <button type="submit" form="ask-form" className="btn">
              Ask!
            </button>
          </Fragment>
        </Modal>
      )}
      <input className="input" placeholder="Search" />
      {asked?.map((question) => (
        <QuestionBubble key={question._id} id={question._id} text={question.question} type="question" />
      ))}
    </div>
  );
}
