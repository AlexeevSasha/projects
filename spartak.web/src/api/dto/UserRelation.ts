import { RelationType } from "./ChildCard";

export interface UserRelationDto {
  Value: string;
  Id: string;
  Type: RelationType;
  ContactName: string;
  MobilePhone: string;
  Email: string;
}
