export default function Icon({ icon, styles, action }) {
  return (
    <span onClick={action} className={`material-symbols-outlined cursor-pointer ${styles}`}>
      {icon}
    </span>
  );
}
