import { IRegisterFieldBase } from "./register/IRegisterFieldBase";

export interface IBizObjWithFields {
  id: number;
  name: string;
  fields: IRegisterFieldBase[];
}
