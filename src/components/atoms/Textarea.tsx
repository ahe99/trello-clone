import React, { useRef, useState } from "react";
import type { FC, ChangeEvent, KeyboardEvent, FocusEvent } from "react";

interface TextareaProps {
  value: string;
  placeholder?: string;
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

type TextareaStep = "PLACEHOLDER" | "VIEW" | "INPUT";

export const Textarea: FC<TextareaProps> = ({
  placeholder = "Plz input...",
  value,
  className,
  innerClassName,
  onClick,
  onChange,
  onBlur,
}) => {
  const shouldShowPlaceholder = !!placeholder && !value;

  const [inputMode, setInputMode] = useState<TextareaStep>(
    shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW"
  );

  const cursorPosition = useRef(value.length);

  const handleClick = () => {
    setInputMode("INPUT");
    if (onClick) {
      onClick();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    cursorPosition.current = e.target.selectionStart;
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setInputMode(shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW");
    if (onBlur) {
      onBlur(value);
    }
  };

  const InputBody = () => {
    if (inputMode === "INPUT") {
      return (
        <textarea
          className={`h-full w-full bg-primary-200 p-2 text-primary-800 outline-none placeholder:text-primary-400 ${innerClassName}`}
          value={value}
          onChange={handleChange}
          onFocus={(e) => {
            e.target.selectionStart = cursorPosition.current;
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus
        />
      );
    } else if (inputMode === "VIEW") {
      return (
        <div
          className={`w-full whitespace-pre-wrap p-2 text-primary-800 ${innerClassName}`}
          onClick={handleClick}
        >
          {value}
        </div>
      );
    } else {
      return (
        <div
          className={`w-full truncate p-2 text-primary-400 ${innerClassName}`}
          onClick={handleClick}
        >
          {placeholder}
        </div>
      );
    }
  };

  return (
    <div
      className={`flex w-full cursor-pointer items-center overflow-hidden rounded-md bg-primary-200 text-primary-800 hover:bg-primary-400 ${className}`}
    >
      <InputBody />
    </div>
  );
};
