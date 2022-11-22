import React from "react";
import type { FC } from "react";

import { Textarea } from "../Textarea";

export interface CardDescriptionProps {
  value: string;
  className?: string;
  innerClassName?: string;
  onChange?: (value: string) => void;
}

export const CardDescription: FC<CardDescriptionProps> = ({
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
    <Textarea
      className={className}
      innerClassName={innerClassName}
      value={value}
      onChange={handleChange}
    />
  );
};
