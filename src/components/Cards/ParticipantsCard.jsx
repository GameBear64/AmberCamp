import Icon from '../../components/Icon';

export default function ParticipantsCard({ friend, onClick, icon }) {
  return (
    <div key={friend._id} onClick={onClick} className="flex cursor-pointer items-center rounded bg-base-x p-2 hover:bg-base-m">
      <img
        className="size-11 rounded-full"
        src={
          friend?.picture && friend?.picture !== 'string'
            ? `http://localhost:3030/recourse/${friend?.picture}?size=50`
            : '../profilePic.jpeg'
        }
      />
      <div className="ml-2 flex w-full flex-col justify-between">
        <p className="text-sm font-bold leading-snug text-txtPrimary">{friend?.name || friend?.handle}</p>
        <p className="text-xs leading-snug text-txtSecondary">@{friend?.handle}</p>
      </div>
      <Icon icon={icon} />
    </div>
  );
}
