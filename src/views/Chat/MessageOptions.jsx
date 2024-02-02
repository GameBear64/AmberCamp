import { useState } from 'react';

import Dropdown from '../../components/Dropdown/Dropdown';

import { options } from './slices/enums';
import { reactions } from './slices/enums';

export default function MessageOptions() {
  return (
    <div>
      <div className="flex flex-row gap-1.5">
        <Dropdown stylesDropdown="flex" options={reactions} />
        <Dropdown
          options={options}
          stylesOptions="flex flex-row items-center justify-between gap-3 rounded text-[16px] text-slate-800"
          stylesDropdown="rounded bg-white text-[16px] font-semibold text-slate-800"
        />
      </div>
    </div>
  );
}
