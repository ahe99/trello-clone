import React from "react";
import type { FC, DragEvent } from "react";
import { Draggable } from "react-beautiful-dnd";

import { getDraggableCardId } from "@helpers/position";
import type { CardData } from "@utils/Data";

export interface TaskCardProps {
  className?: string;
  data: CardData;
  index: number;
}

export const TaskCard: FC<TaskCardProps> = ({
  className,
  index,
  data: { id, title, description, types },
}) => {
  return (
    <Draggable draggableId={getDraggableCardId(id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex h-48 w-56 cursor-pointer flex-col rounded-md border-2 border-solid border-primary-800 bg-primary-500 p-2 hover:bg-primary-400 hover:shadow-xl ${
            snapshot.isDragging
              ? "bg-primary-400 shadow-xl"
              : "bg-primary-500 shadow-none"
          } ${className}`}
        >
          <div className=" flex justify-start self-stretch">
            <div className="font-bold">{title}</div>
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
