import React from "react";
import type { ReactNode, FC } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
