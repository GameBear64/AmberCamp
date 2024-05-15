import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import Layout from '@layout';
import AnsweringSection from '@components/CampFire/AnsweringSection';
import AskingSection from '@components/CampFire/AskingSection';

import AnswerPlaceholder from '@routers/placeholders/Answer';
import AskedPlaceholder from '@routers/placeholders/Asked';
import useFetch from '@utils/useFetch';

import { MessagesContext } from '../views/Chat';
const ListType = Object.freeze({
  Asked: 'Asked',
  Answered: 'Answered',
});
export const QuestionContext = createContext('');
export default function CampFire() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [currentList, setCurrentList] = useState(ListType.Answered);
  const [allQuestions, setAllQuestions] = useState({ answered: [], asked: [] });
  const { chatState } = useContext(MessagesContext);

  useEffect(() => {
    useFetch({
      url: 'campfire/questions',
      method: 'GET',
    }).then((res) => {
      setAllQuestions(res);
    });
  }, []);
  console.log(chatState);

  return (
    <QuestionContext.Provider value={{ questionTitle, setQuestionTitle }}>
      <Layout placeholder={currentList === ListType.Answered ? <AnswerPlaceholder /> : <AskedPlaceholder />}>
        <div className="mx-2 flex flex-col">
          <div className="mb-2 flex w-full justify-evenly ">
            <button
              className={`m-2 flex justify-center font-semibold ${
                currentList === ListType.Answered && 'border-b-2 border-primary'
              }`}
              onClick={() => setCurrentList(ListType.Answered)}>
              Answered
            </button>
            <button
              className={`m-2 flex justify-center font-semibold ${currentList === ListType.Asked && 'border-b-2 border-primary'}`}
              onClick={() => setCurrentList(ListType.Asked)}>
              Asked
            </button>
          </div>
          {currentList === ListType.Answered && <AnsweringSection answered={allQuestions.answered} set={setAllQuestions} />}
          {currentList === ListType.Asked && <AskingSection asked={allQuestions.asked} set={setAllQuestions} />}
        </div>
      </Layout>
    </QuestionContext.Provider>
  );
}
