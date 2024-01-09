export interface IDragResult {
  reason: "DROP" | "CANCEL";
  destination?: IDraggableLocation;
  source: IDraggableLocation;
  combine?: ICombine;
  mode: "FLUID" | "SNAP";
  draggableId: string;
}
export interface IDraggableLocation {
  droppableId: string;
  index: number;
}

export interface ICombine {
  draggableId: string;
  droppableId: string;
}
