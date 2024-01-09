import { IPompGraph } from "./IPompGraph";

export interface IPompResponse {
  idPomp: number;
  idPompXml: number;
  name: string;
  mkb10: string[];
  pompCreated: string;
  pompUpdated: string;
  uuidCode: string;
  revisionId: number;
  revisionBdate: string;
  revisionEdate: string;
  documentUrl: string;
  graphs: IPompGraph[];
  status: string;
  idMz?: string;
  sort: number;
  profile: number | null;
  statusId: number | null;
  isCustom: boolean;
}
