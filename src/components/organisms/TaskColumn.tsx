import React from "react";
import type { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { DROP_TYPE } from "@helpers/constants";
import { getDraggableColumnId, getDroppableColumnId } from "@helpers/position";
import type { ColumnData, CardData } from "@utils/Data";

import { Button, ColumnTitle, Icon } from "@components/atoms";
import { TaskCard, Dropdown } from "@components/molecules";
import type { Option } from "@components/molecules";

export interface TaskColumnProps extends ColumnData {
  className?: string;
  index: number;
  onEdit?: (column: ColumnData) => void;
  onDelete?: (columnId: string) => void;
  onCreateCard?: (columnId: string) => void;
  onEditCard?: (columnId: string, card: CardData) => void;
  onDeleteCard?: (columnId: string, cardId: string) => void;
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

export const TaskColumn: FC<TaskColumnProps> = ({
  className,
  title,
  id: columnId,
  index,
  data,
  onCreateCard,
  onEditCard,
  onDeleteCard,
  onEdit,
  onDelete,
}) => {
  const handleClickAction = (key: string) => {
    if (key === "Edit" && onEdit) {
      onEdit({ id: columnId, title, data });
    } else if (key === "Delete" && onDelete) {
      onDelete(columnId);
    }
  };

  const handleCreateCard = () => {
    if (onCreateCard) {
      onCreateCard(columnId);
    }
  };

  const handleEditCard = (card: CardData) => {
    if (onEditCard) {
      onEditCard(columnId, card);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    if (onDeleteCard) {
      onDeleteCard(columnId, cardId);
    }
  };

  const handleEdit = (value: string) => {
    if (onEdit) {
      onEdit({ id: columnId, title: value, data });
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
          <div className="group/column relative flex flex-row justify-between self-stretch">
            <ColumnTitle
              value={title}
              innerClassName="text-primary-900"
              className="my-1"
              onChange={handleEdit}
            />
            <div className="invisible absolute right-0 top-2 z-30 group-hover/column:visible">
              <Dropdown options={CARD_OPTIONS} onSelectItem={handleClickAction}>
                <Icon type="More" />
              </Dropdown>
            </div>
          </div>

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
                  className="mb-2 flex h-6 w-56 items-center justify-center rounded-md bg-primary-500 text-center text-xl text-primary-900 opacity-40 hover:border-2 hover:border-solid hover:opacity-100"
                  onClick={handleCreateCard}
                >
                  <Icon type="Plus" />
                </Button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
