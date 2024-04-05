import Icon from '@components/Icon';

export default function Tag({ children, onClick, styles }) {
  return (
    <div
      className={`leading-sm inline-flex items-center gap-1 rounded-full bg-primary-light px-2 text-xs font-bold uppercase text-primary-dark ${styles} cursor-default`}>
      {!!onClick && <Icon onClick={onClick} clickable styles="text-primary-dark text-lg" icon="close" />}
      {!onClick && <div className="my-3" />}
      <p className="text-center font-semibold">{children}</p>
    </div>
  );
}
