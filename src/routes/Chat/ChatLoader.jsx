import MessageSkeleton from '../../components/MessageSkeleton/MessageSkeleton';
export default function ChatLoader() {
  return (
    <div className="mt-10 mx-16 flex flex-col">
      <MessageSkeleton hMax={210} hMin={80} wMax={410} wMin={150} />
      <div className="flex self-end">
        <MessageSkeleton hMax={210} hMin={80} wMax={410} wMin={150} reverse={true} />
      </div>
      <MessageSkeleton hMax={210} hMin={80} wMax={410} wMin={150} />
    </div>
  );
}
