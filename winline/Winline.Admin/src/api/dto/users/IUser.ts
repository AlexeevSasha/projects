export interface IUser {
  allowPushReceiving: boolean;
  avatarUri: string;
  birthDay: string;
  cityId: string;
  clubId: string;
  createdUtc: string;
  deletedUtc: string | null;
  email: string;
  mobilePlatforms: string[] | null;
  firstName: string;
  lastName: string;
  middleName: string;
  id: string;
  phone: string;
  updatedUtc: string;
}

export interface IFiltersUser {
  pagination: number;
  name: string;
  cityId?: string;
  clubId?: string;
  sorting: string | undefined | null;
}
