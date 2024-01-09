export interface IUserBase {
  givenName: string;
  middleName: string;
  familyName: string;
  gender: string;
  birthDate: Date | string;
  snils: string;
  workPositionCodeFrmr: number;
  workPositionName: string;
  lpuBizKeyFrmr: string;
  lpuNameFrmr: string;
  login: string;
  password: string;
  allMo: boolean;
  seeAllChaptersOrder: boolean;
  seeAllChaptersRegister: boolean;
}
