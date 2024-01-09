import { IPompStage } from "./IPompStage";

export interface IPompGraph {
  idGraph: number;
  idGraphXml: number;
  graphName: string;
  mkb10: string[];
  xmlDiagramContent: string;
  pompStages: IPompStage[];
}
