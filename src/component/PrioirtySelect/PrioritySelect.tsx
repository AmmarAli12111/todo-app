// PrioritySelect.tsx
import { useContext } from "react";
import Button from "../ui/Button/button";
import Dropdown, { DropdownContext } from "../ui/Dropdown/Dropdown";
import { Priority } from "../../types/task";
import { cn } from "../../lib/utils";

type PriorityConfig = {
  label: string;
  color: string;
  icon: string;
};

interface PrioritySelectProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

const priorityConfig: Record<Priority, PriorityConfig> = {
  1: { label: "Priority 1", color: "text-[#db4c3f]", icon: "⚑" },
  2: { label: "Priority 2", color: "text-[#d97706]", icon: "⚑" },
  3: { label: "Priority 3", color: "text-[#2563eb]", icon: "⚑" },
  4: { label: "Priority 4", color: "text-gray-500", icon: "⚑" },
};

function PriorityItem({
  numericValue,
  config,
  isActive,
  onChange,
}: {
  numericValue: Priority;
  config: PriorityConfig;
  isActive: boolean;
  onChange: (value: Priority) => void;
  }) {
  
  /* Uses DropdownContext to inject closeDropdown() and closeOnSelect into PriorityItem 
  children - avoids prop drilling while enabling programmatic dropdown control */
  const context = useContext(DropdownContext);
  
  if (!context) {
    throw new Error("PriorityItem must be used within Dropdown");
  }

  const { closeDropdown, closeOnSelect } = context;

  const handleClick = () => {
    onChange(numericValue);
    if (closeOnSelect) {
      closeDropdown();
    }
  };

  return (
    <Button
      variant="transparent"
      aria-checked={isActive}
      role="menuitemradio"
      type="button"
      className={cn(
        "dropdown-item transition-colors hover:bg-gray-200 rounded-none w-full justify-start gap-1",
        isActive && "dropdown-item--active bg-gray-200 font-medium"
      )}
      onClick={handleClick}
    >
      <span className={`priority-dropdown__icon mr-1 ${config.color}`}>
        {config.icon}
      </span>
      {config.label}
    </Button>
  );
}

function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  const selected = priorityConfig[value];

  return (
    <Dropdown
      className="priority-dropdown w-max min-w-52 rounded-xl"
      closeOnSelect={true}
      trigger={
        <>
          <span className={`priority-dropdown__icon mr-1 ${selected.color}`}>
            {selected.icon}
          </span>
          {selected.label}
        </>
      }
    >
      {Object.entries(priorityConfig).map(([key, config]) => {
        const numericValue = Number(key) as Priority;
        const isActive = value === numericValue;

        return (
          <PriorityItem
            key={numericValue}
            numericValue={numericValue}
            config={config}
            isActive={isActive}
            onChange={onChange}
          />
        );
      })}
    </Dropdown>
  );
}

export default PrioritySelect;