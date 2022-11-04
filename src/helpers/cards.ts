import type { DragDropResponder, DragDropActionHandler } from '@utils/Handler'
import { CardData, ColumnData } from '@utils/Data'

export const isSamePosition: DragDropResponder = (source, destination) => {
  return (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
}

export const isSameColumn: DragDropResponder = (source, destination) => {
  return source.droppableId === destination.droppableId
}

export const moveInSameColumn: DragDropActionHandler<CardData> = (
  originalColumn,
  source,
  destination
) => {
  const newColumn = [...originalColumn]
  const [sourceItem] = newColumn.splice(source.index, 1)
  newColumn.splice(destination.index, 0, sourceItem)

  return newColumn
}

export const moveBetweenColumns: DragDropActionHandler<ColumnData> = (
  originalBoard,
  source,
  destination
) => {
  const newBoard = [...originalBoard]

  const { data: sourceColumn } = newBoard.find(
    (column) => column.id === source.droppableId
  )!
  const sourceItem = sourceColumn[source.index]

  const computedBoard = newBoard.map((column) => {
    const isSourceColumn = column.id === source.droppableId
    const isDestinationColumn = column.id === destination.droppableId

    if (isSourceColumn) {
      column.data.splice(source.index, 1)
    } else if (isDestinationColumn) {
      column.data.splice(destination.index, 0, sourceItem)
    }
    return column
  })

  return computedBoard
}
