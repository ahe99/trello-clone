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
  onEdit?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
}

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
  data: { id: cardId, title, description, types },
  onDelete,
  onEdit,
}) => {
  const handleClickAction = (key: string) => {
    if (key === "Edit" && onEdit) {
      onEdit(cardId);
    } else if (key === "Delete" && onDelete) {
      onDelete(cardId);
    }
  };

  return (
    <Draggable draggableId={getDraggableCardId(cardId)} index={index}>
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
            <div className="invisible absolute right-0 top-0 z-20 opacity-80 group-hover/card:visible">
              <Dropdown options={CARD_OPTIONS} onSelectItem={handleClickAction}>
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
