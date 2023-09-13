export default function TopBar({ backButton, backBtnLable, actionButton, title, moreOptions, actionOptions }) {
  return (
    <div onClick={actionButton} className="flex flex-row justify-between rounded-b px-8 py-3 shadow-sm shadow-slate-300">
      <div className="flex flex-row">
        <span className="material-symbols-outlined mr-2 pt-1 align-bottom text-xl">{backButton}</span>
        <h1 className="text-2xl font-semibold">{backBtnLable}</h1>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div onClick={actionOptions}>
        <span className="material-symbols-outlined mr-2 pt-1 align-bottom text-2xl">{moreOptions}</span>
      </div>
    </div>
  );
}
