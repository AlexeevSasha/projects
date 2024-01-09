import { IamScriptParamDto } from "../IamScriptDto";

export interface IOrderContingentListItem {
  id: number;
  name: string;
  description: string;
  link: string;
  elementTypeId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  elementType: string;
  scriptId: number;
  scriptName?: string;
  params: IamScriptParamDto[];
}
