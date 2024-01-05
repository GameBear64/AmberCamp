import Options from './Options';

export default function Dropdown({ options }) {
  return (
    <div className="dropdown shadow-primary absolute z-10 text-base">
      <ul>
        {options.map((option, i) => (
          <Options key={i} option={option} />
        ))}
      </ul>
    </div>
  );
}
