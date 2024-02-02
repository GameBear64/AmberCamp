import Options from './Options';

export default function Dropdown({ options, stylesDropdown = false, stylesOptions, ...rest }) {
  return (
    <div {...rest} className={`shadow-primary z-10 text-base ${stylesDropdown ? stylesDropdown : 'absolute'}`}>
      <ul>
        {options.map((option, i) => (
          <Options key={i} style={stylesOptions} option={option} />
        ))}
      </ul>
    </div>
  );
}
