import React from "react";

interface FilterBoxProps{
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

const FilterBox = ({id,checked,children,onChange}:FilterBoxProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" name={id} id={id} className="accent-[#db4c3f] cursor-pointer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label className="text-stone-500 text-sm flex-1 font-medium select-none cursor-pointer pl-2 hover:text-stone-700 transition duration-200" htmlFor={id}>{children}</label>
    </div>
  )
}

export default FilterBox;