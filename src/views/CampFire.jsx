import { useEffect, useState } from 'react';

import Layout from '@layout';
import AnsweringSection from '@components/CampFire/AnsweringSection';
import AskingSection from '@components/CampFire/AskingSection';

import AnswerPlaceholder from '@routers/placeholders/Answer'
import AskedPlaceholder from '@routers/placeholders/Asked'

const ListType = Object.freeze({
  Asked: 'Asked',
  Answered: 'Answered',
});

export default function CampFire() {
  const [currentList, setCurrentList] = useState(ListType.Answered);

  return (
    <Layout placeholder={currentList === ListType.Answered ? <AnswerPlaceholder/> : <AskedPlaceholder/>}>
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
            className={`m-2 flex justify-center font-semibold ${
              currentList === ListType.Asked && 'border-b-2 border-primary'
            }`}
            onClick={() => setCurrentList(ListType.Asked)}>
            Asked
          </button>
        </div>
        {currentList === ListType.Answered && <AnsweringSection questions={[]} />}
        {currentList === ListType.Asked && <AskingSection answers={[]} />}
      </div>
    </Layout>
  )
}