export interface ChildCardDto {
  Cards: ChildCardEntity[];
}

export interface ChildCardEntity {
  Id: string;
  FullName: string;
  RelationType: RelationType;
  Number: string;
}

export enum RelationType {
  other = "Other",
  acquaintance = "Acquaintance",
  friend = "Friend",
  child = "Child",
  parent = "Parent",
  family = "Family",
}
