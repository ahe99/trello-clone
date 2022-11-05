export type CardData = {
  id: string;
  title: string;
  description?: string;
  types?: string[];
};
export type ColumnData = {
  id: string;
  title: string;
  data: CardData[];
};
export type BoardData = {
  id: string;
  title: string;
  data: ColumnData[];
};
