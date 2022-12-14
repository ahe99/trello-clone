import { BoardData, ColumnData } from "@utils/Data";
import type { DragDropActionHandler } from "@utils/Handler";
import { getNewId } from "./position";

export const createColumn = (): ColumnData => {
  const newColumn = {
    id: getNewId(),
    title: "untitled",
    data: [],
  };
  return newColumn;
};

export const moveInSameBoard: DragDropActionHandler<ColumnData> = (
  originalBoard,
  source,
  destination
) => {
  const newBoard = [...originalBoard];
  const [sourceItem] = newBoard.splice(source.index, 1);
  newBoard.splice(destination.index, 0, sourceItem);

  return newBoard;
};

// export const moveBetweenBoards: DragDropActionHandler<BoardData> = (
//   originalData,
//   source,
//   destination
// ) => {
//  return
// }
