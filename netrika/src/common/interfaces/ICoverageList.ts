export interface ICoverageList {
  covNumber: string;
  covPayer: string | null;
  covPeriodStart: Date | string | null;
  covPeriodEnd: Date | string | null;
  covCategoryCode: string | null;
  covDiagnosis: string | null;
  covClassDisplay: string | null;
}
