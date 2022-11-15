import React, { useState } from "react";
import type { FC, ReactNode } from "react";
import { IconType } from "@icon-park/react/es/all";

import { Icon } from "@components/atoms";

export type Option = {
  icon?: IconType;
  label?: string;
  key: string;
};

type TriggerMode = "hover" | "click";

interface DropdownProps {
  className?: string;
  children?: ReactNode;
  options: Option[];
  size?: string;
  triggerMode?: TriggerMode;
  onSelectItem?: (key: string) => void;
  onSelectStart?: () => void;
  onSelectEnd?: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  size = "1rem",
  options,
  triggerMode = "hover",
  onSelectItem,
  onSelectStart,
  onSelectEnd,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOpenOptions = () => {
    if (showOptions && onSelectStart) {
      onSelectStart();
    } else if (!showOptions && onSelectEnd) {
      onSelectEnd();
    }
    setShowOptions((prev) => !prev);
  };

  const handleSelectItem = (key: string) => {
    if (onSelectItem) {
      onSelectItem(key);
    }
    setShowOptions(false);
  };

  return (
    <div
      className={`group flex cursor-pointer flex-col ${className}`}
      onClick={() => {
        if (triggerMode === "click") {
          handleOpenOptions();
        }
      }}
      onMouseEnter={() => {
        if (triggerMode === "hover") {
          handleOpenOptions();
        }
      }}
      onMouseLeave={() => {
        if (triggerMode === "hover") {
          handleOpenOptions();
        }
      }}
    >
      <div className="place-self-end rounded-md border-b-primary-400 bg-primary-100 px-2 py-1 hover:rounded-t-md hover:bg-primary-200 group-hover:rounded-b-none group-hover:border-b-2 group-hover:border-solid">
        {children}
      </div>

      {showOptions && (
        <div className="flex flex-col">
          {options.map(({ icon, label, key }) => (
            <span
              className="flex flex-row items-center justify-start rounded-md rounded-br-none rounded-tr-none border-b-2 border-dashed border-b-primary-400 bg-primary-100 p-1 text-primary-800 last:mb-0 last:rounded-br-md last:border-0 hover:bg-primary-200"
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectItem(key);
              }}
            >
              {icon && (
                <Icon className={label ? "pr-1" : ""} type={icon} size={size} />
              )}
              {label && <div style={{ fontSize: size }}>{label}</div>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
