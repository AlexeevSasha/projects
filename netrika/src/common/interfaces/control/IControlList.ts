export interface IControlList {
  id: number;
  registerId: number;
  name: string;
  description: string;
  isDefault: boolean;
  itemsCount: number;
  searchRecordType: number;
  searchOrderType: number;
  searchFields: number[] | null;
  searchSql: string;
  searchType: boolean;
  patientCount: number; // ?Дублирование поля itemsCount????
  isDone: boolean;
  sort: number;
  isExtendedKs: boolean;
}

export interface SortingControlListDto {
  id: number;
  sort: number;
}
