import { useEffect, useState } from 'react';

import QuestionBubble from '@components/CampFire/QuestionBubble';
import RoundButton from '@components/RoundButton';

import { Topics } from '@utils/enums/topics';
import useFetch from '@utils/useFetch';

export default function AnsweringSection({ answered, set }) {
  //TODO: remake for an array of topics, maybe an array and .push or .splice it
  const [topic, setTopic] = useState(Topics.all);
  const [filteredData, setFilteredData] = useState(answered);

  useEffect(() => {
    setFilteredData(answered);
  }, [answered]);

  const selectTopic = (newTopic) => {
    setTopic((prev) => (prev == newTopic ? Topics.all : newTopic));
  };
  const newQuestion = () => {
    console.log('new question request with topic', topic);

    useFetch({
      // url: `campfire/get?category=${topic}`,
      url: `campfire/get`,
      method: 'GET',
    }).then((res) => {
      set((prev) => {
        console.log(prev, res);
        return { answered: [...prev.answered, res], asked: prev.asked };
      });
    });
  };

  const onSearch = (e) => {
    setFilteredData(answered.filter((data) => data.question.includes(e.target.value)));
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-2">
        <RoundButton
          icon="contact_support"
          colors="bg-cyan-500 text-base"
          highlighted={topic === Topics.general}
          onClick={() => selectTopic(Topics.general)}
        />
        <RoundButton
          icon="favorite"
          colors="bg-pink-500 text-base"
          highlighted={topic === Topics.sex}
          onClick={() => selectTopic(Topics.sex)}
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
      <button className="btn my-5" onClick={newQuestion}>
        Answer questions
      </button>
      <input onChange={onSearch} className="input" placeholder="Search" />
      {filteredData?.map((answer) => (
        <QuestionBubble key={answer._id} id={answer._id} text={answer.question} type="answer" />
      ))}
    </div>
  );
}
