import { useContext } from 'react';

import Form from '@form/Form';

import socket from '@utils/socket';

import { MessagesContext } from '../../views/Chat';
import ConnectForm from '../Form/ConnectForm';
import Icon from '../Icon';
export default function ChatArea({ submitHandler, defaultValue }) {
  const { chatState } = useContext(MessagesContext);
  const emitType = () => {
    socket.emit('message/typing', { to: chatState._id });
  };
  return (
    <Form onSubmit={submitHandler} submitOnEnter defaultValues={{ message: defaultValue }}>
      <ConnectForm>
        {({ register }) => {
          return (
            <div className="m-0 flex w-full px-5 text-txtPrimary">
              <div className={`m-0 flex w-full items-center`}>
                <Icon styles="absolute ml-2" icon="add_circle" />
                <input
                  {...register('message')}
                  onKeyDown={emitType}
                  placeholder="Send a message"
                  className="input rounded-l pl-10"
                />
              </div>
              <button className="btn material-symbols-rounded rounded-l-none text-xl">send</button>
            </div>
          );
        }}
      </ConnectForm>
    </Form>
  );
}
