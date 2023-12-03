import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ContactsList({ label, list }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <p className="p-2 text-xl font-bold">{label}</p>
      {list?.length < 1 && <p> nobody here yet </p>}
      {list?.map((contact) => (
        <div
          key={contact._id}
          className={`m-2 flex justify-between border-l-4 border-cyan-600 p-1 ${
            contact._id == id ? 'border-rose-600' : 'border-cyan-600'
          }`}>
          <Link to={`/contacts/${contact._id}`}>{contact?.username || contact.handle}</Link>
          <button className="material-symbols-outlined" onClick={() => navigate(`/chat/${contact._id}`)}>
            chat
          </button>
        </div>
      ))}
    </>
  );
}
