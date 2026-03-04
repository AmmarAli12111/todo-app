import React from "react";
import { cn } from "../../../lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"|"transparent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  className = "",
  type = "button",
  variant,
  size = "md",
  ref,
  disabled,
  children,
  ...props

}: ButtonProps) => {

  const sizeClasses = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-3 px-6 text-base",
  };

  return <button ref={ref} type={type} className={cn("btn flex items-center justify-center cursor-pointer font-medium sm:text-[14px] transition-all duration-300",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variant === "primary" && "bg-stone-200 text-stone-800 hover:bg-stone-300",
      variant === "secondary" && "bg-[#db4c3f] text-white hover:bg-[#bb4d43]",
      variant === "outline" && "bg-transparent text-stone-800 border border-stone-300 hover:bg-stone-50",
      variant === "ghost" && "bg-transparent text-stone-800 hover:bg-stone-100",
      variant === "danger" && "bg-[#dc2626] text-white hover:bg-[#dc2626]/80",
      variant === "success" && "bg-[#25b84c] text-white hover:bg-[#25b84c]/80",
    sizeClasses[size]
    , className)}
    {...props}
    disabled={disabled}
    aria-disabled={disabled}
  >
    {children}
  </button>;
};

export default Button;
