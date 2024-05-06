import { Link } from 'react-router-dom';

export default function QuestionBubble({ text, type = 'answer', id }) {
  return (
    <Link to={type == 'answer' ? `/campfire/${id}` : `/campfire/answers/${id}`}>
      <div className="my-2 flex flex-row gap-3 rounded bg-base-m px-2 py-4">
        <p>{text}</p>
      </div>
    </Link>
  );
}
