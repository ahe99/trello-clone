import React from "react";
import type { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { DROP_TYPE } from "@helpers/constants";
import { getDraggableColumnId, getDroppableColumnId } from "@helpers/position";
import type { ColumnData, CardData } from "@utils/Data";

import { TaskCard } from "@components/molecules";

export interface TaskColumnProps extends ColumnData {
  className?: string;
  index: number;
  onDragEnd?: (newColumn: CardData[]) => void;
}

export const TaskColumn: FC<TaskColumnProps> = ({
  className,
  title,
  id,
  index,
  data,
}) => {
  return (
    <Draggable draggableId={getDraggableColumnId(id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex h-max  flex-col rounded-md border-2 border-solid border-primary-800 bg-primary-200 px-2 hover:brightness-110 ${
            snapshot.isDragging ? "brightness-110" : "brightness-100"
          } ${className}`}
        >
          <div className={`mx-4 my-2 self-start `}>{title}</div>
          <Droppable
            droppableId={getDroppableColumnId(id)}
            type={DROP_TYPE.CARD}
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                className="flex flex-col"
                ref={provided.innerRef}
              >
                {data.map((item, i) => (
                  <TaskCard.Draggble
                    key={item.id}
                    index={i}
                    data={item}
                    className="mb-2"
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
