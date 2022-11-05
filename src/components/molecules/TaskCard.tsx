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

const DraggableTaskCard: FC<TaskCardProps> = ({
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
          className={`flex h-48 w-56 cursor-pointer flex-col rounded-md border-2 border-solid border-primary-800 bg-primary-500 p-2 hover:brightness-110 ${
            snapshot.isDragging ? "brightness-110" : "brightness-100"
          } ${className}`}
        >
          <div className=" flex justify-start self-stretch">
            <div className="text-p font-bold">{title}</div>
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

const StaticTaskCard: FC<TaskCardProps> = ({
  className,
  data: { id, title, description, types },
}) => {
  return (
    <div
      className={`flex h-48 w-56 cursor-pointer flex-col rounded-md border-2 border-solid bg-primary-500 p-2 hover:bg-primary-400  ${className}`}
    >
      <div className="flex justify-start self-stretch border-b-2">
        <div className="font-bold">{title}</div>
      </div>
      <div className="flex-1">
        <div>{description}</div>
      </div>
    </div>
  );
};

export const TaskCard = {
  Static: StaticTaskCard,
  Draggble: DraggableTaskCard,
};
