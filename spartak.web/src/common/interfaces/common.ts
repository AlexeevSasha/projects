export type BaseODataFilters = {
  pagination?: number;
  sorting?: string;
  byTeamArray?: string;
  TeamId?: string;
  FullName?: string;
  [key: string]: any;
};

export type BaseFilters = {
  [key: string]: any;
};

export type ODateResponce<T extends unknown> = { "value": T[]; "@odata.count": number };
