export default function RoundButton({icon, highlighted, colors, ...rest}) {
  return (
    <button
      className={`accent-circle ${colors} ${highlighted && 'border-4 border-txtPrimary'}}`}
      {...rest}
    >
      <span className="material-symbols-rounded cursor-pointer text-2xl">{icon}</span>
    </button>
  )
}
