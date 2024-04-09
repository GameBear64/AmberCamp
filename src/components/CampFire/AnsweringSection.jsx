import { useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '@components/Icon';
import RoundButton from '@components/RoundButton';

import {Topics} from '@utils/enums/topics'

export default function AnsweringSection() {

  //TODO: remake for an array of topics, maybe an array and .push or .splice it
  const [topic, setTopic] = useState(Topics.all)

  const selectTopic = (newTopic) => {
    setTopic(prev => prev == newTopic ? Topics.all : newTopic)
  }

  const newQuestion = () => {
    console.log('new question request with topic', topic);
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center gap-2'>
        <RoundButton icon='contact_support' colors='bg-cyan-500 text-base' highlighted={topic === Topics.general} onClick={() => selectTopic(Topics.general)}/>
        <RoundButton icon='favorite' colors='bg-pink-500 text-base' highlighted={topic === Topics.sex} onClick={() => selectTopic(Topics.sex)}/>
        <RoundButton icon='book_2' colors='bg-purple-500 text-base' highlighted={topic === Topics.literature} onClick={() => selectTopic(Topics.literature)}/>
        <RoundButton icon='sports_gymnastics' colors='bg-green-500 text-base' highlighted={topic === Topics.life} onClick={() => selectTopic(Topics.life)}/>
      </div>
      <button className='btn my-5' onClick={newQuestion}>Answer questions</button>
      <input className="input" placeholder="Search"/>
      <Link className="mt-10" to={`/campfire`}>
        no chat
      </Link>
      <Link to={`/campfire/2`}>
        go to <Icon icon="chat_bubble" />
      </Link>
    </div>
  )
}
