export default function Button({ label, type = 'button', size }) {
  const btnSize = size === 'small' ? 'py-1' : 'py-2';
  return (
    <button type={type} className={`my-3 w-72 rounded bg-orange-700 px-4 font-semibold text-white shadow-md ${btnSize} text-lg`}>
      {label}
    </button>
  );
}
