import React from "react";
import { cn } from "../../../lib/utils";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  overlay?: boolean;
  isOpen?: boolean;
  isExiting?: boolean;
};

const Modal = ({
  onClose,
  children,
  overlay = true,
  isOpen = true,
  isExiting = false,
}: ModalProps) => {

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  if (!isOpen) return null;

  return (
    <div className="modal-container fixed inset-0 z-1000 flex items-center justify-center p-4">
      {overlay && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black/40 cursor-pointer backdrop-blur-xs"
          onClick={onClose}
          aria-hidden
        />
      )}
      <div
        className={cn("modal relative w-full max-w-[600px] rounded-2xl z-1999 bg-[#fafaf9]",
        isExiting ? "animate-modal-exit" : "animate-modal-enter",
      )}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="modal"
      >
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
