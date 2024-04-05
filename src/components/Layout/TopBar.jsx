import Icon from '../Icon';
export default function TopBar({ backButton, backBtnLabel, actionButton, title, moreOptions, actionOptions }) {
  return (
    <div className="sticky top-0 z-20 hidden w-full flex-row justify-between bg-base-x px-8 py-3 text-txtPrimary shadow-md lg:flex">
      <div className="flex flex-row">
        <Icon onClick={actionButton} styles="mr-2 pt-1 align-bottom text-xl" icon={backButton} />
        <h1 className="text-2xl font-semibold">{backBtnLabel}</h1>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Icon onClick={actionOptions} styles="mr-2 pt-1 align-bottom text-2xl">
        {moreOptions}
      </Icon>
    </div>
  );
}
