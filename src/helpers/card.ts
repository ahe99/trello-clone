import { CardData } from '@utils/CardData'

export const isSameCard = (cardA: CardData, cardB: CardData): boolean => {
  return (
    cardA.position.x === cardB.position.x &&
    cardA.position.y === cardB.position.y
  )
}

export const onSameColumn = (cardA: CardData, cardB: CardData): boolean => {
  return cardA.position.x === cardB.position.x
}

export const onSameRow = (cardA: CardData, cardB: CardData): boolean => {
  return cardA.position.y === cardB.position.y
}
