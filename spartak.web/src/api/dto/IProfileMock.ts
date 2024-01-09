import { ChairPlottingStatus, UserInfoDto } from "./UserInfoDto";

interface IData {
  fanLevel: string;
  activeDenarii: number;
  statusPoints: number;
}

export interface IUser {
  data: IData;
  chairPlottingStatus: ChairPlottingStatus | null;
  nickName: string | null;
  subscription?: string;
  personalData: UserInfoDto["PersonalData"];
  activeDenarium: number;
  fanData: UserInfoDto["FanData"];
  AllowToUseWinline: null | boolean;
}
