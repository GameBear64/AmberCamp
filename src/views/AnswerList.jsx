import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionBubble from '@components/CampFire/QuestionBubble';

import useFetch from '@utils/useFetch';

export default function AnswerList() {
  const [answerList, setAnswerList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    useFetch({ url: `campfire/answers/${id}` }).then((data) => {
      // setChatState(data);
      console.log(data);
      setAnswerList(data);
    });
  }, [id]);

  return (
    <div className="mx-auto w-1/2">
      AnswerList <p>{id}</p>
      {answerList.map((answer) => (
        <QuestionBubble key={answer._id} text={answer.messages[0].body} id={answer._id} />
      ))}
    </div>
  );
}
