import React, {
  useCallback,
  useState,
  createContext,
  useMemo,
} from "react";
import { cn } from "../../../lib/utils";
import Button from "../Button/button";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  closeOnSelect?: boolean;
}

const DROPDOWN_EXIT_MS = 160;

interface DropdownContextType {
  closeDropdown: () => void;
  closeOnSelect: boolean;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);


function Dropdown({
  trigger,
  children,
  className = "",
  triggerClassName = "",
  closeOnSelect = false,
}:DropdownProps)  {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = React.useState(false);
  const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);


  const requestClose = useCallback(() => {
    if (isExiting) return;
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
    }, DROPDOWN_EXIT_MS);
  }, [isExiting]);

  
  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      requestClose();
    } else {
      setIsOpen(true);
    }
  }, [isOpen, requestClose]);
  
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) requestClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, requestClose]);


  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          requestClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  React.useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  const contextValue = useMemo(() => ({
    closeDropdown: requestClose,
    closeOnSelect,
  }), [requestClose, closeOnSelect]);

  return (
    // Provides DropdownContext to inject closeDropdown() + closeOnSelect into children
    <DropdownContext.Provider value={contextValue}>
      <div
        ref={dropdownRef}
        className="dropdown relative inline-block"
      >
        <Button
          variant="outline"
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className={cn("dropdown__trigger inline-flex items-center gap-1 cursor-pointer select-none rounded-md",
            triggerClassName)}
        >
          {trigger}
        </Button>
        {isOpen && (
          <div
            role="menu"
            aria-label="dropdown menu"
            className={cn("dropdown__menu absolute top-[120%] flex flex-col bg-white border border-solid border-gray-300 shadow-md z-1000 overflow-hidden",
              isExiting ? "animate-dropdown-exit" : "animate-dropdown-enter",
              className,)}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
