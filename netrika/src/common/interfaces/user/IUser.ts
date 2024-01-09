import { IUserBase } from "./IUserBase";
import { IValue } from "../ValueDto.g";
import { IUserAvailableMo } from "./IUserAvailableMo";
import { IUserAvailableGroup } from "./IUserAvailableGroup";
import { ICustomSelect } from "../ISelect";

export interface IUser extends IUserBase {
  id: number;
  role: number;
  roleName: string;
  availableWorkPositions: IValue[];
  availableMos: IUserAvailableMo[];
  isFrmrUser: boolean;
  availableGroups: IUserAvailableGroup[];
  isActive: boolean | null;
  isSysAcc: boolean;
  frmrBlock?: boolean | null;
}

export interface IUserForm {
  givenName: string;
  middleName: string;
  familyName: string;
  gender: string;
  birthDate: Date | string;
  snils: string;
  workPositionName: ICustomSelect;
  lpuNameFrmr: ICustomSelect;
  login: string;
  password: string;
  allMo: boolean;
  id: number;
  role: ICustomSelect;
  isFrmrUser: boolean;
  isActive: boolean | null;
  availableWorkPositions: ICustomSelect[];
  availableMos: ICustomSelect[];
  availableGroups: ICustomSelect[];
  frmrBlock?: boolean | null;
}
