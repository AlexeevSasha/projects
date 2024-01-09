import { FieldTypeEnum } from "./FieldTypeEnum";

export interface IamScriptDto {
  id?: number;
  name: string;
  createdDateTime?: Date;
  updatedDateTime?: Date;
  comment?: string;
  script: string;
  params: IamScriptParamDto[];
}
export interface IamScriptParamDto {
  idIamScript?: number;
  name: string;
  description?: string;
  nsiUid: string;
  exampleValue: string;
  catalog: boolean;
  id: number;
  type: FieldTypeEnum;
}

export interface CreateIamScriptDto {
  id?: number;
  name: string;
  comment?: string;
  script: string;
  params: IamScriptParamDto[];
  isShow: boolean;
}
export interface UpdateIamScriptDto extends CreateIamScriptDto {
  id?: number;
}
