export interface IObservation {
  name: string;
  value: string;
  fromOrderConfAttr: boolean;
  isValueNA: boolean;
  valueDisplay?: string;
  valueUnitSuffix?: string;
}
export interface IDefaultGroupObservation {
  code: 0;
  diagnosisType: string;
  documentDate: Date | string;
  documentName: string;
  doctorName: string;
  lpu: string;
  name: string;
  value: string;
}
