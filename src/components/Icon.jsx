export default function Icon({ icon, styles, ...rest }) {
  return (
    <span {...rest} className={`material-symbols-outlined cursor-pointer ${styles}`}>
      {icon}
    </span>
  );
}
