export default function TopBar({ backButton, backBtnLable, title, actionButton, moreOptions }) {
  return (
    <div onClick={actionButton} className="flex justify-between flex-row px-8 shadow-sm shadow-slate-300 rounded-b py-3">
      <div className="flex flex-row">
        <span className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">{backButton}</span>
        <h1 className="font-semibold text-2xl">{backBtnLable}</h1>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>
      <div>
        <span className="material-symbols-outlined align-bottom pt-1 mr-2 text-2xl">{moreOptions}</span>
      </div>
    </div>
  );
}
