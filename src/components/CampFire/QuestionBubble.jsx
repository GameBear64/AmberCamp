import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuestionContext } from '../../views/CampFire';
import RoundButton from '../RoundButton';
export default function QuestionBubble({ text, type = 'answer', id }) {
  const { setQuestionTitle } = useContext(QuestionContext);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        setQuestionTitle(text);
        navigate(type == 'answer' ? `/campfire/${id}` : `/campfire/answers/${id}`);
      }}
      className="my-2 flex flex-row gap-3 rounded bg-base-m p-3">
      <div>
        <RoundButton icon="contact_support" colors={`bg-cyan-500 text-base`} />
      </div>
      <p className="flex items-center">{text}</p>
    </div>
  );
}
