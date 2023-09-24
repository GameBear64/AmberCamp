import Options from './Options';

export default function Dropdown({ options }) {
  return (
    <div className="dropdown absolute z-10 text-base shadow-md">
      <ul>
        {options.map((option) => (
          <Options key={option.text} text={option.text} color={option?.color} onClick={option?.action} />
        ))}
      </ul>
    </div>
  );
}
