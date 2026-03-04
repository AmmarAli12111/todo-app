import * as React from "react";
import { cn } from "../../../lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  noResize?: boolean;
  textareaSize?: "sm" | "md" | "lg";
  preventEmptyShiftEnter?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({ id, label, className = "", maxLength, noResize = true, textareaSize = "md", preventEmptyShiftEnter = false, value, ref, ...props }:TextareaProps) => {
  
    const localRef = React.useRef<HTMLTextAreaElement | null>(null);
    const maxAutoHeight = textareaSize === "lg" ? 180 : 120;

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const autoResize = React.useCallback(
      (el: HTMLTextAreaElement) => {
        // Reset first so shrinking works when content is deleted.
        el.style.height = "auto";
        const nextHeight = Math.min(el.scrollHeight, maxAutoHeight);
        el.style.height = `${nextHeight}px`;
        el.style.overflowY =
          el.scrollHeight > maxAutoHeight ? "auto" : "hidden";
      },
      [maxAutoHeight],
    );

    React.useEffect(() => {
      if (localRef.current) {
        autoResize(localRef.current);
      }
    }, [autoResize, value]);


    const sizeClasses = {
      sm: "text-sm",
      md: "text-sm font-normal placeholder:font-normal placeholder:text-stone-500 placeholder:text-sm leading-5",
      lg: "text-lg font-semibold placeholder:font-medium placeholder:text-lg placeholder:text-stone-500 leading-7",
    };

    return (
      <>
        {label && (
          <label htmlFor={id} className="textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          className={cn(
            "textarea outline-none mb-1 wrap-break-word whitespace-pre-wrap",
            sizeClasses[textareaSize],
            noResize ? "resize-none" : "resize-y",
            className
          )}
          id={id}
          maxLength={maxLength}
          rows={1}
          value={value}
          {...props}
          onKeyDown={(e) => {
            if (preventEmptyShiftEnter && e.key === "Enter" && e.shiftKey ) {
              const isEmpty = !value || String(value).trim() === "";
              if (isEmpty) e.preventDefault();
            }
            props.onKeyDown?.(e);
          }}
          onInput={(e) => {
            autoResize(e.currentTarget);
            props.onInput?.(e);
          }}
        />
      </>
    );
}

export default Textarea;
