import React from "react";
import type { FC } from "react";

import { Input } from "../Input";

export interface ColumnTitleProps {
  value: string;
  className?: string;
  innerClassName?: string;
  onChange?: (value: string) => void;
}

export const ColumnTitle: FC<ColumnTitleProps> = ({
  value,
  className,
  innerClassName,
  onChange,
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Input
      className={className}
      innerClassName={innerClassName}
      value={value}
      onChange={handleChange}
    />
  );
};
