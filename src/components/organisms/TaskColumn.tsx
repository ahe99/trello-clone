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
  onCreateCard?: (columnId: string) => void;
  onEditCard?: (columnId: string, cardId: string) => void;
  onDeleteCard?: (columnId: string, cardId: string) => void;
}

export const TaskColumn: FC<TaskColumnProps> = ({
  className,
  title,
  id: columnId,
  index,
  data,
  onCreateCard,
  onEditCard,
  onDeleteCard,
}) => {
  const handleCreateCard = () => {
    if (onCreateCard) {
      onCreateCard(columnId);
    }
  };
  const handleEditCard = (cardId: string) => {
    if (onEditCard) {
      onEditCard(columnId, cardId);
    }
  };
  const handleDeleteCard = (cardId: string) => {
    if (onDeleteCard) {
      onDeleteCard(columnId, cardId);
    }
  };
  return (
    <Draggable draggableId={getDraggableColumnId(columnId)} index={index}>
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
            droppableId={getDroppableColumnId(columnId)}
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
                  <TaskCard
                    key={item.id}
                    index={i}
                    data={item}
                    className="mb-2"
                    onEdit={handleEditCard}
                    onDelete={handleDeleteCard}
                  />
                ))}
                {provided.placeholder}
                <Button
                  onClick={handleCreateCard}
                  className="mb-2 flex h-6 w-56 items-center justify-center rounded-md bg-primary-500 text-center text-xl text-primary-900 opacity-40 hover:border-2 hover:border-solid hover:opacity-100"
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
