import { Input } from '@form/Fields';
import Form from '@form/Form';

import Icon from '../Icon';

export default function ChatArea({ submitHandler, defaultValue }) {
  return (
    <div className="relative flex w-full px-5">
      <Icon styles="absolute px-2 pt-3 text-slate-700" icon="add_circle" />
      <Form onSubmit={submitHandler} submitOnEnter defaultValues={{ message: defaultValue }}>
        <div className="flex w-full flex-row">
          <Input
            name="message"
            styleInput="shadow-primary w-full rounded-l bg-gray-50 py-3 pl-10 pr-5 focus:outline-none"
            placeholder="Send a message"
          />
          <button type="submit">
            <Icon styles="px-1 pt-3 bg-slate-700 text-gray-100 block rounded-r shadow-primary" icon="send" />
          </button>
        </div>
      </Form>
    </div>
  );
}
