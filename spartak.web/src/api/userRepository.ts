import { BaseApiService } from "./BaseApiService";
import { ChildCardDto, RelationType } from "./dto/ChildCard";
import { IUser } from "./dto/IProfileMock";
import { UserInfoDto } from "./dto/UserInfoDto";
import { UserRelationDto } from "./dto/UserRelation";
import { Ipassport } from "../componentPages/pageProfile/passportInfoForm";

export interface PhoneChangeAbilityDto {
  Password: string;
  Phone: string;
}

export interface EmailChangeAbilityDto {
  Password: string;
  Email: string;
}

interface EmailChangeDto {
  Email: string;
  Code: string;
}

interface PhoneChangeDto {
  Phone: string;
  Reason: string;
  Code: string;
}

interface SaveUserDataDto {
  BirthDay: string | null;
  Gender?: string;
  IsBecomeSteward: boolean;
  CitizenshipId?: string;
}

export interface AddRelationsDto {
  PhoneNumber: string;
  RelationType: RelationType;
}

export interface BindChildCardDto {
  RelationId: string;
  Number: string;
  ScretchCode: string;
}

export interface NewPasswordDtoActive {
  NewPassword: string;
}

export type SaveFanDataDto = UserInfoDto["FanData"];

export type UserCardEntity = {
  CardNumber: string;
  CardId: string;
};

export interface UserSibIdDto {
  SibId: string;
}

type ConsentToUseWinlineDto = {
  AllowToUseWinline: boolean;
  BirthDate: string;
};

export type ContactCardType = {
  CardNumber: string;
  ExpiryDate: string;
};

class UserRepository extends BaseApiService {
  constructor() {
    super("profile/User/");
  }

  mapUser = (user: UserInfoDto) => {
    return (
      user.PersonalData && {
        chairPlottingStatus: user.ChairPlottingStatus,
        nickName: user.NickName,
        data: {
          fanLevel: user.LoyaltyLevel,
          activeDenarii: user.ActiveDenarium,
          statusPoints: user.StatusPoints,
        },
        personalData: user.PersonalData,
        subscription: user.SeasonTicket,
        activeDenarium: user.ActiveDenarium,
        fanData: user.FanData,
        AllowToUseWinline: user.AllowToUseWinline,
      }
    );
  };

  fetchUserInfo = async (): Promise<IUser> => this.mapUser(await this.get<UserInfoDto>("GetUserInfo", {}));

  fetchFullUserInfo = async (): Promise<IUser> => this.mapUser(await this.get<UserInfoDto>("GetFullUserInfo"));

  saveUserData = (body: SaveUserDataDto) => this.post<UserInfoDto>("SaveUserData", JSON.stringify(body), {});

  saveFanData = (body: SaveFanDataDto) => this.post<UserInfoDto>("SaveFanProfile", JSON.stringify(body));

  updateSibIdData = (body: string) => this.post<UserSibIdDto>("UpdateSib", JSON.stringify(body));

  phoneCheckAbility = (body: PhoneChangeAbilityDto) => this.post("CheckAbilityToChangePhone", JSON.stringify(body));

  emailCheckAbility = (body: EmailChangeAbilityDto) => this.post("CheckAbilityToChangeEmail", JSON.stringify(body));

  emailChange = async (body: EmailChangeDto) => await this.post("ChangeEmail", JSON.stringify(body));

  phoneChange = async (body: PhoneChangeDto) => await this.post("ChangePhone", JSON.stringify(body));

  fetchRelations = () => this.get<UserRelationDto[]>("GetRelations", []);

  fetchChildCards = () => this.get<ChildCardDto>("GetChildCards", { Cards: [] }).then(({ Cards }) => Cards);

  addRelations = (body: AddRelationsDto) => this.post("AddRelation", JSON.stringify(body));

  bindChildCard = (body: BindChildCardDto) => this.post("BindChildCard", JSON.stringify(body));

  changePassword = (body: NewPasswordDtoActive) => this.post("ChangePassword", JSON.stringify(body));

  deleteRelation = (relationId: string) => this.delete(`DeleteRelation?relationId=${relationId}`);

  savePassportData = async (body: Ipassport): Promise<IUser> =>
    this.mapUser(await this.post("SavePassportData", JSON.stringify(body), {}));

  fetchUserCards = () => this.get<UserCardEntity[]>("GetUserCards", []);

  allowToUseWinline = (body: boolean) => this.post("AllowToUseWinline", body.toString());

  consentToUseWinline = (body: ConsentToUseWinlineDto) => this.post("ConsentToUseWinline", JSON.stringify(body));

  postAddChairPlotting = (body: { Plotting: string }) =>
    this.post("AddChairPlotting?api-version=1.0", JSON.stringify(body));

  getUsersBarCard = () => this.get<ContactCardType>("GetContactCard", []);
}

export const userRepository = new UserRepository();
