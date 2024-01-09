export interface IMeddispList {
  meddispValue: string;
  meddispStatus: string | null;
  meddispRefuse: string | null;
  meddispMedication: string | null;
  meddispDate: Date | string | null;
  meddispPreformer: string | null;
  meddispAssigner: string | null;
  meddispQuantity: number | null;
  meddispQuantityUnit: string | null;
  meddispMedreqNumder: string | null;
}
