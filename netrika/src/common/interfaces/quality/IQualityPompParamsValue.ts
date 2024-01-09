export interface IQualityPompParamsValue {
  id: number;
  idQueryPrim: number;
  idOrderCard: number | null;
  idRegisterCard: number | null;
  value: string;
  idSource?: number;
  register?: boolean;
  displayValue: string[];
}
