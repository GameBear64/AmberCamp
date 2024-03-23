import { useContext } from 'react';

import { Input } from '@form/Fields';
import Form from '@form/Form';

import socket from '@utils/socket';

import { MessagesContext } from '../../views/Chat';
import IconInput from '../Form/Inputs/IconInput';
import Icon from '../Icon';
export default function ChatArea({ submitHandler, defaultValue }) {
  const { id } = useContext(MessagesContext);
  const emitType = () => {
    socket.emit('message/typing', { to: id });
  };
  return (
    <Form onSubmit={submitHandler} submitOnEnter defaultValues={{ message: defaultValue }}>
      <div className="m-0 flex w-full px-5">
        {/* <Icon styles="absolute px-2 pt-3 text-slate-700" icon="add_circle" /> */}
        {/* <input className="flex w-full bg-black"></input> */}
        {/* <div className="flex w-full flex-row"> */}
        <IconInput name="message" width="w-full flex" icon="add_circle" placeholder="Send a message" />
        {/* <Input name="message" styleInput="w-full flex m-0" placeholder="Send a message" onKeyDown={emitType} /> */}
        {/* <button type="submit">
            <Icon styles="px-1 pt-3 bg-slate-700 text-gray-100 block rounded-r shadow-primary" icon="send" />
          </button>
        </div> */}
      </div>
    </Form>
  );
}
