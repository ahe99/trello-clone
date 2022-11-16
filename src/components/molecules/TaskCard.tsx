import React from "react";
import type { FC, DragEvent } from "react";
import { Draggable } from "react-beautiful-dnd";

import { getDraggableCardId } from "@helpers/position";
import type { CardData } from "@utils/Data";
import { Icon } from "@components/atoms";
import { Dropdown } from "./Dropdown";
import type { Option } from "./Dropdown";
export interface TaskCardProps {
  className?: string;
  data: CardData;
  index: number;
  onEdit?: (key: string) => void;
  onDelete?: (key: string) => void;
}

type CARD_ACTION = "Edit" | "Delete";

const CARD_OPTIONS = [
  {
    icon: "Edit",
    label: "Edit",
    key: "Edit",
  },
  {
    icon: "Delete",
    label: "Delete",
    key: "Delete",
  },
] as Option[];

export const TaskCard: FC<TaskCardProps> = ({
  className,
  index,
  data: { id, title, description, types },
  onDelete,
  onEdit,
}) => {
  const handleSelectItem = (key: CARD_ACTION) => {
    if (key === "Edit" && onEdit) {
      onEdit(id);
    } else if (key === "Delete" && onDelete) {
      onDelete(id);
    }
  };

  return (
    <Draggable draggableId={getDraggableCardId(id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`group/card flex h-48 w-56 cursor-pointer flex-col rounded-md border-2 border-solid border-primary-800 bg-primary-500 p-2 hover:bg-primary-400 hover:shadow-xl ${
            snapshot.isDragging
              ? "bg-primary-400 shadow-xl"
              : "bg-primary-500 shadow-none"
          } ${className}`}
        >
          <div className="relative flex flex-row justify-between self-stretch">
            <div className="font-bold">{title}</div>
            <div className="invisible absolute right-0 top-2 group-hover/card:visible">
              <Dropdown options={CARD_OPTIONS} onSelectItem={handleSelectItem}>
                <Icon type="More" />
              </Dropdown>
            </div>
          </div>
          <span className="m-1 border-b-2" />
          <div className="flex-1">
            <div>{description}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
