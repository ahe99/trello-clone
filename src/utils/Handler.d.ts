export type DragDropResponder = (
  source: DraggableLocation,
  destination: DraggableLocation
) => boolean;

export type DragDropActionHandler<T> = (
  originalData: T[],
  source: DraggableLocation,
  destination: DraggableLocation
) => T[];
