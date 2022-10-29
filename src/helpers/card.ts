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

//Array.sort(sortAscendingColumn)
export const sortAscendingColumn = (cards: CardData[]) => {
  return cards.sort((a: CardData, b: CardData) => a.position.y - b.position.y)
}

//Array.sort(sortDescendingColumn)
export const sortDescendingColumn = (cards: CardData[]) => {
  return cards.sort((a: CardData, b: CardData) => b.position.y - a.position.y)
}
