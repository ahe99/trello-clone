import { Position } from '@components/molecules'

export const isSameCard = (
  positionA: Position,
  positionB: Position
): boolean => {
  return positionA.x === positionB.x && positionA.y === positionB.y
}

export const onSameColumn = (
  positionA: Position,
  positionB: Position
): boolean => {
  return positionA.x === positionB.x
}

export const onSameRow = (positionA: Position, positionB: Position): boolean => {
  return positionA.y === positionB.y
}
