import React from "react";
import type { FC, ReactNode, MouseEvent } from "react";

import { Icon } from "./Icon";

interface TagProps {
  label: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
}

export const Tag: FC<TagProps> = ({ label, className, onClick, children }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`inline-flex items-center rounded-xl border-2 border-indigo-200 bg-primary-200 px-2 text-primary-800 ${className}`}
      onClick={handleClick}
    >
      <div className="flex">{label}</div>
      {children}
    </div>
  );
};
