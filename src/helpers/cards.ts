import type { DragDropActionHandler } from "@utils/Handler";
import { CardData, ColumnData } from "@utils/Data";
import { getDroppableColumnId } from "./position";

export const moveInSameColumn: DragDropActionHandler<CardData> = (
  originalColumn,
  source,
  destination
) => {
  const newColumn = [...originalColumn];
  const [sourceItem] = newColumn.splice(source.index, 1);
  newColumn.splice(destination.index, 0, sourceItem);

  return newColumn;
};

export const moveBetweenColumns: DragDropActionHandler<ColumnData> = (
  originalBoard,
  source,
  destination
) => {
  const newBoard = [...originalBoard];

  const { data: sourceColumn } = newBoard.find(
    (column) => getDroppableColumnId(column.id) === source.droppableId
  )!;
  const sourceItem = sourceColumn[source.index];

  const computedBoard = newBoard.map((column) => {
    const isSourceColumn =
      getDroppableColumnId(column.id) === source.droppableId;
    const isDestinationColumn =
      getDroppableColumnId(column.id) === destination.droppableId;

    if (isSourceColumn) {
      column.data.splice(source.index, 1);
    } else if (isDestinationColumn) {
      column.data.splice(destination.index, 0, sourceItem);
    }
    return column;
  });

  return computedBoard;
};
