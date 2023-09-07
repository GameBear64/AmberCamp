export default function Button({ label, type = 'button', size }) {
  const btnSize = size === 'small' ? 'py-1' : 'py-2';
  return (
    <button type={type} className={`my-3 font-semibold rounded text-white px-4 w-72 shadow-md bg-orange-700 ${btnSize} text-lg`}>
      {label}
    </button>
  );
}
