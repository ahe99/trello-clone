import React, { useState } from "react";
import type { FC, ChangeEvent } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  className: string;
  innerClassName: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

type InputStep = "PLACEHOLDER" | "VIEW" | "INPUT";

export const Input: FC<InputProps> = ({
  placeholder = "Plz input...",
  value,
  className,
  innerClassName,
  onClick,
  onChange,
  onBlur,
}) => {
  const shouldShowPlaceholder = !!placeholder && !value;
  console.log(!!placeholder, !value);
  const [inputMode, setInputMode] = useState<InputStep>(
    shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW"
  );

  const handleClick = () => {
    setInputMode("INPUT");
    if (onClick) {
      onClick();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleBlur = () => {
    setInputMode(shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW");
    if (onBlur) {
      onBlur(value);
    }
  };

  const InputBody = () => {
    if (inputMode === "INPUT") {
      return (
        <input
          className={`h-full w-full bg-primary-200 p-2 text-primary-800 outline-none placeholder:text-primary-400 ${innerClassName}`}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus
        />
      );
    } else if (inputMode === "VIEW") {
      return (
        <div
          className={`w-full truncate p-2 text-primary-800 ${innerClassName}`}
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
      className={`flex h-8 w-full cursor-pointer items-center overflow-hidden rounded-md bg-primary-200 text-primary-800 hover:bg-primary-400 ${className}`}
    >
      <InputBody />
    </div>
  );
};
