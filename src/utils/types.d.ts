export type CardData = {
  id: string
  title: string
  description: string
  types?: string[]
}
export type ColumnData = {
  id: number
  data: CardData[]
}
export type BoardData = ColumnData[]