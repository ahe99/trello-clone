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
import { DROP_TYPE } from "@helpers/constants";
import { BoardData, CardData, ColumnData } from "@utils/Data";
import { useModal } from "@hooks";
import { ModalProvider } from "@context/modal";

import { TaskColumn } from "@components/organisms";
import { Button, Icon, Tag } from "@components/atoms";
export interface TaskBoardProps extends BoardData {
  className?: string;
  onDragEnd?: (newData: ColumnData[]) => void;
  onCreateCard?: (newData: ColumnData[]) => void;
  onEditCard?: (newData: ColumnData[]) => void;
  onDeleteCard?: (newData: ColumnData[]) => void;
  onCreateColumn?: (newData: ColumnData[]) => void;
  onEditColumn?: (newData: ColumnData[]) => void;
  onDeleteColumn?: (newData: ColumnData[]) => void;
}

export const TaskBoard: FC<TaskBoardProps> = ({
  className,
  id: boardId,
  title,
  data,
  onDragEnd,
  onCreateCard,
  onEditCard,
  onDeleteCard,
  onCreateColumn,
  onEditColumn,
  onDeleteColumn,
}) => {
  const modal = useModal();

  const [boardVisible, setBoardVisible] = useState(true);

  const handleCreateColumn = () => {
    const newColumn = createColumn();
    const newData = [...data, newColumn];
    if (onCreateColumn) {
      onCreateColumn(newData);
    }
  };

  const handleEditColumn = (editedColumn: ColumnData) => {
    const newData = data.map((column) =>
      column.id === editedColumn.id ? editedColumn : column
    );
    if (onEditColumn) {
      onEditColumn(newData);
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    const newData = data.filter((column) => column.id !== columnId);
    if (onDeleteColumn) {
      onDeleteColumn(newData);
    }
  };

  const handleCreateCard = (columnId: string) => {
    const newData = data.map((column) => {
      if (column.id === columnId) {
        const newCard = createCard();
        const newColumn = [...column.data, newCard];
        return {
          ...column,
          data: newColumn,
        };
      } else {
        return column;
      }
    });
    if (onCreateCard) {
      onCreateCard(newData);
    }
  };

  const handleEditCard = (columnId: string, editedCard: CardData) => {
    // modal.putContent("123");
    // modal.toggle();

    const newData = data.map((column) => {
      if (column.id === columnId) {
        const newColumn = column.data.map((_card) =>
          _card.id === editedCard.id ? editedCard : _card
        );
        return {
          ...column,
          data: newColumn,
        };
      } else {
        return column;
      }
    });
    if (onEditCard) {
      onEditCard(newData);
    }
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    const newData = data.map((column) => {
      if (column.id === columnId) {
        const newColumn = column.data.filter((card) => card.id !== cardId);
        return {
          ...column,
          data: newColumn,
        };
      } else {
        return column;
      }
    });
    if (onDeleteCard) {
      onDeleteCard(newData);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    const hasDestination = !!destination;
    if (!hasDestination || isSameDraggable(source, destination)) {
      return;
    }

    let newData = [...data];
    if (type === DROP_TYPE.CARD) {
      newData = handleDragDropCard(result);
    } else if (type === DROP_TYPE.COLUMN) {
      newData = handleDragDropColumn(result);
    }

    if (onDragEnd) {
      onDragEnd(newData);
    }
  };

  const handleDragDropColumn = (result: DropResult): ColumnData[] => {
    const { source, destination } = result;

    let newData = [...data];
    if (inSameDroppable(source, destination)) {
      newData = moveInSameBoard(data, source, destination);
    }

    return newData;
  };

  const handleDragDropCard = (result: DropResult): ColumnData[] => {
    const { source, destination } = result;

    let newData = [...data];
    if (inSameDroppable(source, destination)) {
      const targetColumn = data.find(
        (item) => source.droppableId === getDroppableColumnId(item.id)
      )!;

      const newColumn = {
        id: targetColumn.id,
        title: targetColumn.title,
        data: moveInSameColumn(targetColumn.data, source, destination),
      };

      newData = data.map((column) => {
        if (column.id === newColumn.id) {
          return newColumn;
        } else {
          return column;
        }
      });
    } else {
      newData = moveBetweenColumns(data, source, destination);
    }

    return newData;
  };

  const handleToggleBoard = () => {
    setBoardVisible((prev) => !prev);
  };

  return (
    <div className="inline-flex flex-col">
      <div
        className="mb-2 flex-grow-0 cursor-pointer items-center"
        onClick={handleToggleBoard}
      >
        <Tag label={title} />
        <Icon
          type="Right"
          className={`transition-transform ${boardVisible ? "rotate-90" : ""}`}
          size="1.2rem"
        />
      </div>

      {boardVisible && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            className={`flex flex-row rounded-md border-2 border-solid border-primary-800 bg-primary-100 p-2 pr-0 ${className}`}
          >
            <Droppable
              droppableId={getDroppableBoardId(boardId)}
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
                      onEdit={handleEditColumn}
                      onDelete={handleDeleteColumn}
                      onCreateCard={handleCreateCard}
                      onEditCard={handleEditCard}
                      onDeleteCard={handleDeleteCard}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Button
              className="mb-2 mr-2 flex w-6 items-center justify-center rounded-md bg-primary-500 text-primary-900 opacity-40 hover:border-2 hover:border-solid hover:opacity-100"
              onClick={handleCreateColumn}
            >
              <Icon type="Plus" />
            </Button>
          </div>
        </DragDropContext>
      )}
    </div>
  );
};
