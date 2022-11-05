import React from "react";
import type { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { DROP_TYPE } from "@helpers/constants";
import { getDraggableColumnId, getDroppableColumnId } from "@helpers/position";
import type { ColumnData, CardData } from "@utils/Data";

import { Button } from "@components/atoms";
import { TaskCard } from "@components/molecules";

export interface TaskColumnProps extends ColumnData {
  className?: string;
  index: number;
  onCreateCard: (id: string) => void;
}

export const TaskColumn: FC<TaskColumnProps> = ({
  className,
  title,
  id,
  index,
  data,
  onCreateCard,
}) => {
  const handleCreateCard = () => {
    if (onCreateCard) {
      onCreateCard(id);
    }
  };

  return (
    <Draggable draggableId={getDraggableColumnId(id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex h-max flex-col rounded-md border-2 border-solid border-primary-800 bg-primary-200 px-2 hover:bg-primary-100 hover:shadow-lg ${
            snapshot.isDragging ? "shadow-lg" : "shadow-none"
          } ${className}`}
        >
          <div className={`mx-4 my-2 self-start text-primary-900`}>{title}</div>
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
                <Button
                  onClick={handleCreateCard}
                  className="mb-2 flex h-6 w-56 items-center justify-center rounded-md border-2 border-solid bg-primary-500 text-center text-xl text-primary-900 hover:bg-primary-400"
                >
                  +
                </Button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
