import Options from './Options';

export default function Dropdown({ options, stylesOptions }) {
  return (
    <div className="left-0 z-10 bg-base text-base shadow-md">
      <ul>
        {options.map((option, i) => (
          <Options key={i} style={stylesOptions} option={option} />
        ))}
      </ul>
    </div>
  );
}
