import Options from './Options';

export default function Dropdown({ options }) {
  return (
    <div className="dropdown absolute shadow-md text-base">
      <ul>
        {options.map((option) => (
          <Options key={option.text} text={option.text} color={option?.color} onClick={option?.action} />
        ))}
      </ul>
    </div>
  );
}
