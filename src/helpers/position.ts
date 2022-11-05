import type { DragDropResponder } from "@utils/Handler";
import moment from "moment";

export const isSameDraggable: DragDropResponder = (source, destination) => {
  return (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  );
};

export const inSameDroppable: DragDropResponder = (source, destination) => {
  return source.droppableId === destination.droppableId;
};

export const getNewId = () => {
  return moment().valueOf().toString();
};

export const getDraggableCardId = (id: string): string => {
  return `draggable-card-${id}`;
};

export const getDroppableColumnId = (id: string): string => {
  return `droppable-column-${id}`;
};

export const getDraggableColumnId = (id: string): string => {
  return `draggable-column-${id}`;
};

export const getDroppableBoardId = (id: string): string => {
  return `droppable-board-${id}`;
};
