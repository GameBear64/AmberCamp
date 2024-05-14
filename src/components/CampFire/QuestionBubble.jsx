import { Link } from 'react-router-dom';

import RoundButton from '../RoundButton';
export default function QuestionBubble({ text, type = 'answer', id }) {
  return (
    <Link to={type == 'answer' ? `/campfire/${id}` : `/campfire/answers/${id}`}>
      <div className="my-2 flex flex-row gap-3 rounded bg-base-m p-3">
        <div>
          <RoundButton icon="contact_support" colors={`bg-cyan-500 text-base`} />
        </div>
        <p className="flex items-center">{text}</p>
      </div>
    </Link>
  );
}
