import { Fragment, useState } from 'react';

import QuestionBubble from '@components/CampFire/QuestionBubble';
import Modal from '@components/Modal';
import RoundButton from '@components/RoundButton';

import { CheckBox, Form, Textarea } from '@form/Fields';

import { Topics } from '@utils/enums/topics';
import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
export default function AskingSection({ asked, set }) {
  const [askModalShown, setAskModalShown] = useState(false);
  const [filteredData, setFilteredData] = useState(asked);
  const [topic, setTopic] = useState(Topics.all);

  const askTheQuestion = (data) => {
    useFetch({
      url: 'campfire/new',
      method: 'POST',
      body: { question: data.question, anonymous: data.anonymous, category: topic },
    }).then((res) => {
      set((prev) => prev.asked.push(res));
      successSnackBar('Question asked');
      setAskModalShown(false);
    });
  };
  const selectTopic = (newTopic) => {
    setTopic((prev) => (prev == newTopic ? Topics.all : newTopic));
  };

  const onSearch = (e) => {
    setFilteredData(asked.filter((data) => data.question.includes(e.target.value)));
  };
  return (
    <div className="flex flex-col">
      <button className="btn my-5" onClick={() => setAskModalShown(true)}>
        Ask question
      </button>
      {askModalShown && (
        <Modal closeFunction={() => setAskModalShown(false)} title="New question..." easyClose>
          <Form id="ask-form" onSubmit={(data) => askTheQuestion(data)} defaultValues={{ anonymous: true }}>
            <Textarea rows="4" label="Question" name="question" placeholder="So I was wondering..." styles="my-2" />
            <div className="flex gap-2">
              <RoundButton
                icon="contact_support"
                colors="bg-cyan-500 text-base"
                highlighted={topic === Topics.general}
                onClick={() => selectTopic(Topics.general)}
              />
              <RoundButton
                icon="favorite"
                colors="bg-pink-500 text-base"
                highlighted={topic === Topics.adult}
                onClick={() => selectTopic(Topics.adult)}
              />
              <RoundButton
                icon="book_2"
                colors="bg-purple-500 text-base"
                highlighted={topic === Topics.literature}
                onClick={() => selectTopic(Topics.literature)}
              />
              <RoundButton
                icon="sports_gymnastics"
                colors="bg-green-500 text-base"
                highlighted={topic === Topics.life}
                onClick={() => selectTopic(Topics.life)}
              />
            </div>
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
      <input onChange={onSearch} className="input" placeholder="Search" />

      {filteredData?.map((question) => (
        <QuestionBubble
          key={question._id}
          id={question._id}
          text={question.question}
          type="question"
          category={question.category}
        />
      ))}
    </div>
  );
}
