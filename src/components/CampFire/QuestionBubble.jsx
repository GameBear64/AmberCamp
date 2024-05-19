import { useNavigate } from 'react-router-dom';

import { topicsStyle } from '../../utils/enums/topics';
import RoundButton from '../RoundButton';

export default function QuestionBubble({ text, type = 'answer', id, category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(type == 'answer' ? `/campfire/${id}` : `/campfire/answers/${id}`)}
      className="my-2 flex flex-row gap-3 rounded bg-base-m p-3">
      <div>
        {topicsStyle.map(
          (topic) =>
            topic.category === category && (
              <RoundButton key={topic.category} icon={topic.icon} colors={`${topic.style} text-base`} />
            )
        )}
      </div>
      <p className="flex items-center">{text}</p>
    </div>
  );
}
