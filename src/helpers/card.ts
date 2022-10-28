import { Position } from '@components/molecules'

export const isSameCard = (
  dragPosition: Position,
  dropPosition: Position
): boolean => {
  return dragPosition.x === dropPosition.x && dragPosition.y === dropPosition.y
}

export const onSameColumn = (
  dragPosition: Position,
  dropPosition: Position
): boolean => {
  return dragPosition.x === dropPosition.x
}

export const onSameRow = (dragPosition: Position, dropPosition: Position): boolean => {
  return dragPosition.y === dropPosition.y
}
