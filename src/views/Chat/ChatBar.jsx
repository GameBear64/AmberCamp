import Icon from '../../components/Icon';
export default function ChatBar({ user }) {
  
  return (
    <div className="shadow-primary sticky top-0 z-20 flex flex-row justify-between bg-white px-8 py-3">
      <div className="flex flex-row items-center gap-2">
        <img className="h-10 w-10 rounded-full" src={`http://localhost:3030/recourse/${user?.picture}?size=50`} alt="" />
        <h1 className="text-sm font-bold leading-snug text-gray-900">@{user?.handle}</h1>
      </div>
      <h1 className="text-2xl font-semibold"></h1>
      <Icon styles="flex items-center text-2xl text-slate-700" icon="settings" />
    </div>
  );
}
