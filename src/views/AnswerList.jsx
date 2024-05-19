import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionBubble from '@components/CampFire/QuestionBubble';

import useFetch from '@utils/useFetch';

export default function AnswerList() {
  const [answerList, setAnswerList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    useFetch({ url: `campfire/answers/${id}` }).then((data) => {
      setAnswerList(data);
    });
  }, [id]);
  return (
    <div className="mx-auto h-full w-1/2">
      {answerList.length > 0 ? (
        <div className="my-5">
          {answerList.map((answer) => (
            <QuestionBubble key={answer._id} text={answer.messages[0].body} id={answer._id} category={answer.category} />
          ))}
        </div>
      ) : (
        <p className="flex h-full items-center justify-center font-semibold text-txtPrimary">No answers yet...</p>
      )}
    </div>
  );
}
