import Layout from '../../components/Layout/Layout';
import SingleChatLoader from '../../components/SingleChatLoader';
import ChatLoader from '../Chat/ChatLoader';
export default function ChatListLoader() {
  return (
    <Layout
      left={
        <div className="border-r-4 h-full border-[#EBEBEB]">
          <div className="mx-10 my-10">
            <SingleChatLoader count={7} width={150} />
          </div>
        </div>
      }
      right={<ChatLoader />}
      native={true}
    />
  );
}
