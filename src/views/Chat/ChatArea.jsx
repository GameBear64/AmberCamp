import Icon from '../../components/Icon';
export default function ChatArea({ onKeyDown, ...rest }) {
  return (
    <div className="relative flex w-full px-5">
      <Icon styles="absolute px-2 pt-3 text-slate-700" icon="add_circle" />
      <div className="flex w-full flex-row">
        <input
          onKeyDown={onKeyDown}
          className="shadow-primary w-full rounded-l bg-gray-50 py-3 pl-10 pr-5 focus:outline-none"
          placeholder="Send a message"
          type="text"
        />
        <Icon {...rest} styles="px-1 pt-3 bg-slate-700 text-gray-100 block rounded-r shadow-primary" icon="send" />
      </div>
    </div>
  );
}
