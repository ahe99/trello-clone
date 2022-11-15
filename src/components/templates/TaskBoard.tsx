import React, { useState, useRef } from "react";
import type { FC } from "react";
import { Droppable, DropResult, DragDropContext } from "react-beautiful-dnd";

import {
  moveInSameColumn,
  moveBetweenColumns,
  createCard,
} from "@helpers/cards";
import { createColumn, moveInSameBoard } from "@helpers/column";
import {
  isSameDraggable,
  inSameDroppable,
  getDroppableBoardId,
  getDroppableColumnId,
} from "@helpers/position";
import { BoardData, ColumnData } from "@utils/Data";
import { DROP_TYPE } from "@helpers/constants";

import { TaskColumn } from "@components/organisms";
import { Button, Icon } from "@components/atoms";

export interface TaskBoardProps extends BoardData {
  className?: string;
  onDragEnd?: (newData: ColumnData[]) => void;
  onCreateCard?: (newData: ColumnData[]) => void;
  onCreateColumn?: (newData: ColumnData[]) => void;
}

export const TaskBoard: FC<TaskBoardProps> = ({
  className,
  id,
  title,
  data,
  onDragEnd,
  onCreateCard,
  onCreateColumn,
}) => {
  const handleCreateCard = (columnId: string) => {
    const newData = data.map((item) => {
      if (item.id === columnId) {
        const newCard = createCard();
        const newColumn = [...item.data, newCard];
        return {
          ...item,
          data: newColumn,
        };
      } else {
        return item;
      }
    });
    if (onCreateCard) {
      onCreateCard(newData);
    }
  };

  const handleCreateColumn = () => {
    const newColumn = createColumn();
    const newData = [...data, newColumn];
    if (onCreateColumn) {
      onCreateColumn(newData);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    let newData = [...data];

    const hasDestination = !!destination;
    if (!hasDestination || isSameDraggable(source, destination)) {
      return;
    }

    if (type === DROP_TYPE.CARD) {
      if (inSameDroppable(source, destination)) {
        const targetColumn = data.find(
          (item) => source.droppableId === getDroppableColumnId(item.id)
        )!;

        const newColumn = {
          id: targetColumn.id,
          title: targetColumn.title,
          data: moveInSameColumn(targetColumn.data, source, destination),
        };

        newData = newData.map((column) => {
          if (column.id === newColumn.id) {
            return newColumn;
          } else {
            return column;
          }
        });
      } else {
        newData = moveBetweenColumns(data, source, destination);
      }
    } else if (type === DROP_TYPE.COLUMN) {
      if (inSameDroppable(source, destination)) {
        newData = moveInSameBoard(data, source, destination);
      }
    }

    if (onDragEnd) {
      onDragEnd(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className={`flex grow-0 flex-row rounded-md border-2 border-solid border-primary-800 bg-primary-100 p-2 pr-0 ${className}`}
      >
        <Droppable
          droppableId={getDroppableBoardId(id)}
          type={DROP_TYPE.COLUMN}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row"
            >
              {data.map((item, index) => (
                <TaskColumn
                  key={item.id}
                  index={index}
                  className="mr-2"
                  title={item.title}
                  id={item.id}
                  data={item.data}
                  onCreateCard={handleCreateCard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Button onClick={handleCreateColumn}>
          <Icon type="Add" size="3rem" />
        </Button>
      </div>
    </DragDropContext>
  );
};
