export interface IPatientReportLogItem {
  id: number;
  reportNumber: number;
  reportDate: Date | string;
  organizationBizKey: string;
  mkb10: string | null;
  complCountPat: number | null;
  vitCountPat: number | null;
  qualCountPat: number | null;
  countPat: number | null;
  regId: number | null;
}
