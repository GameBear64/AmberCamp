import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Icon from '@components/Icon';
import RoundButton from '@components/RoundButton';

import Tag from '../../components/Profile/Tag';
import { QuestionContext } from '../../views/CampFire';
export default function CampFireBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allQuestions } = useContext(QuestionContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const answeredTopic = allQuestions?.answered?.find((answer) => answer._id === id);
    const askedTopic = allQuestions?.asked?.find((question) => question.answers.some((answer) => answer._id === id));
    setDetails(askedTopic || answeredTopic);
  }, [id, allQuestions]);

  return (
    <div className="sticky top-0 flex w-full flex-row items-center gap-2 bg-base px-8 py-3 shadow-sm">
      <Icon styles="mr-2 pt-1 block md:hidden align-bottom text-xl" onClick={() => navigate('/chat')} icon="arrow_back_ios_new" />
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center">
          <RoundButton icon="contact_support" colors={`bg-cyan-500 size-10 text-base`} />
          <p className="mx-2 leading-snug text-txtPrimary">{details?.question}</p>
        </div>
        {details?.anonymous ? (
          <Tag> anonymous </Tag>
        ) : (
          <RoundButton
            onClick={() => navigate('/contacts/' + details?.author)}
            icon="person"
            colors="text-primary-dark bg-primary-light"
          />
        )}
      </div>
    </div>
  );
}
