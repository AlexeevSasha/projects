import { IGroupDisease } from "./IGroupDisease";

export interface IDiseaseCardCustomBlock {
  description: string;
  id: number;
  groups: IGroupDisease["customBlock"][];
  sort: number;
}
