export interface IUser {
  id: string;
  createdUtc: string;
  deletedUtc: string | null;
  updatedUtc: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDay: string;
  phone: string;
  email: string;
  cityId: string;
  mobilePlatforms: string[] | null;
  allowedToUseWinLine: boolean;
}

export interface IFiltersUser {
  pagination: number;
  name: string;
  cityId?: string;
  sorting: string | undefined | null;
}
