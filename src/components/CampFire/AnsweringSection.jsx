import { useEffect, useState } from 'react';

import QuestionBubble from '@components/CampFire/QuestionBubble';

import useFetch from '@utils/useFetch';

export default function AnsweringSection({ answered, set }) {
  const [filteredData, setFilteredData] = useState(answered);

  useEffect(() => {
    setFilteredData(answered);
  }, [answered]);

  const newQuestion = () => {
    useFetch({
      // url: `campfire/get?category=${topic}`,
      url: `campfire/get`,
      method: 'GET',
    }).then((res) => {
      set((prev) => {
        return { answered: [...prev.answered, res], asked: prev.asked };
      });
    });
  };

  const onSearch = (e) => {
    setFilteredData(answered.filter((data) => data.question.includes(e.target.value)));
  };
  return (
    <div className="flex flex-col">
      <button className="btn my-5" onClick={newQuestion}>
        Answer questions
      </button>
      <input onChange={onSearch} className="input" placeholder="Search" />
      {filteredData?.map((answer) => (
        <QuestionBubble key={answer._id} id={answer._id} text={answer.question} type="answer" category={answer.category} />
      ))}
    </div>
  );
}
