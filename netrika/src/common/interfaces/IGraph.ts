import { IPoint } from "./IPoint";
import { IDiseaseCard } from "./IDiseaseCard";

export interface IGraph extends IDiseaseCard {
  points: IPoint[];
  legend: string;
  title: string;
}
