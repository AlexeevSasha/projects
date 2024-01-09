export type UserInfoDto = {
  ChairPlottingStatus: ChairPlottingStatus | null;
  NickName: string | null;
  PersonalData: {
    FirstName?: string;
    LastName?: string;
    MiddleName?: string;
    Email?: string;
    MobilePhone?: string;
    BirthDate?: string;
    Gender?: string;
    CitizenshipId?: string;
    IsBecomeSteward?: string;
  };
  AllowToUseWinline: null | boolean;
  LoyaltyLevel: string;
  StatusPoints: number;
  ActiveDenarium: number;
  SeasonTicket: string;
  FanData: {
    Passport: {
      Series: string;
      Number: string;
      WhenIssued: string;
      IssuedBy: string;
      IssuedByCode: string;
      BirthPlace: string;
    };
    RegistrationAddress: {
      RegionId: string;
      CityId: string;
      Street: string;
      House: string;
      Block: string;
      Flat: string;
      Index: string;
    };
    ActualAddress: {
      RegionId: string;
      CityId: string;
      Street: string;
      House: string;
      Block: string;
      Flat: string;
      Index: string;
    };
    AddressesAreEqual: boolean;
    SibId: string;
  };
};

export enum ChairPlottingStatus {
  NotAvailable = "NotAvailable",
  Available = "Available",
  OnCheck = "OnCheck",
  Reject = "Reject",
  Approve = "Approve",
}
