import Dropdown from '../../components/Dropdown/Dropdown';

import { options } from './slices/enums';
import { reactions } from './slices/enums';

export default function MessageOptions() {
  return (
    <div>
      <div className="flex flex-row gap-1.5">
        <Dropdown stylesDropdown="flex" options={reactions} />
        <Dropdown
        // TODO what are options??
          options={options}
          stylesOptions="flex flex-row items-center justify-between gap-3 rounded text-slate-800"
          stylesDropdown="rounded bg-white font-semibold text-slate-800"
        />
      </div>
    </div>
  );
}
