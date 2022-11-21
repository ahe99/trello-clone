import React, { useState, useRef } from "react";
import type { FC, KeyboardEvent, MouseEvent } from "react";

import { Tag, Icon, Input } from "@components/atoms";

import { getNewId } from "@helpers/position";

export type IdType = string | number;

export type OptionType = {
  id: IdType;
  label: string;
};

interface MultiSelectProps {
  options: OptionType[];
  value: IdType[];
  placeholder?: string;
  className?: string;
  onClick?: () => void;
  onBlur?: () => void;
  onSelectItem?: (id: IdType) => void;
  onDelete?: (id: IdType) => void;
  onCreateItem?: (option: OptionType) => void;
}

type SelectStep = "PLACEHOLDER" | "VIEW" | "SELECT";

export const MultiSelect: FC<MultiSelectProps> = ({
  value,
  options,
  placeholder = "Plz select...",
  className,
  onClick,
  onBlur,
  onSelectItem,
  onDelete,
  onCreateItem,
}) => {
  const shouldShowPlaceholder = !!placeholder && !value.length;

  const [selectMode, setSelectMode] = useState<SelectStep>(
    shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW"
  );

  const [newItem, setNewItem] = useState("");

  const handleClick = () => {
    setSelectMode("SELECT");

    if (onClick) {
      onClick();
    }
  };

  const handleBlur = () => {
    if (!!newItem) {
      if (onCreateItem) {
        onCreateItem({ id: getNewId(), label: newItem });
      }
      setNewItem("");
    } else {
      setSelectMode(shouldShowPlaceholder ? "PLACEHOLDER" : "VIEW");
    }
    if (onBlur) {
      onBlur();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleSelect = (id: IdType) => {
    if (onSelectItem) {
      onSelectItem(id);
    }
  };

  const handleDelete = (id: IdType) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const MultiSelectBody = () => {
    if (selectMode === "SELECT") {
      const labels = value.map(
        (id) => options.find((item) => item.id === id)!.label
      );

      return (
        <div
          className={`flex w-full flex-row items-center truncate p-2 text-primary-400`}
          onClick={handleClick}
        >
          <div
            className="flex flex-row flex-wrap"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            {labels.map((label, index) => (
              <Tag
                key={index}
                label={label}
                className="mr-1 cursor-pointer"
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  handleDelete(value[index]);
                }}
              >
                <Icon type="Close" size="0.8rem" />
              </Tag>
            ))}
          </div>
          <input
            type="text"
            className={`h-full flex-1 flex-shrink-0 bg-primary-200 text-primary-800 outline-none placeholder:text-primary-400 group-hover:bg-primary-400`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      );
    } else if (selectMode === "VIEW") {
      const labels = value.map(
        (id) => options.find((item) => item.id === id)?.label
      );
      const filteredLabels = labels.filter(
        (label): label is string => label !== undefined
      );

      return (
        <div
          className={`w-full truncate p-2 text-primary-400`}
          onClick={handleClick}
        >
          <div className="flex flex-row flex-wrap">
            {filteredLabels.map((label, index) => (
              <Tag key={index} label={label} className="mr-1" />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`h-8 w-full truncate p-2 text-primary-400`}
          onClick={handleClick}
        >
          {placeholder}
        </div>
      );
    }
  };

  const filteredOptions = options.filter(
    (option) => !value.includes(option.id)
  );
  return (
    <div className="flex flex-col">
      <div
        className={`group flex w-full cursor-pointer items-center overflow-hidden rounded-md bg-primary-200 text-primary-800 hover:bg-primary-400 ${className}`}
      >
        <MultiSelectBody />
      </div>

      {selectMode === "SELECT" &&
        filteredOptions.map((option) => (
          <div
            key={option.id}
            className="flex h-8 cursor-pointer items-center rounded-t-md rounded-b-md bg-primary-100 pl-2 text-primary-800 hover:bg-primary-400"
            onClick={(e) => {
              handleSelect(option.id);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            {option.label}
          </div>
        ))}
    </div>
  );
};
