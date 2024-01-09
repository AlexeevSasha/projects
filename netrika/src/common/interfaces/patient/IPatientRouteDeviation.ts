export interface IPatientRouteDeviation
  extends Partial<{
    moOid: string;
    moName: string;
    stageCode: string;
    stateCode: string;
    completedOn: Date | string;
    deviationKind: number;
    deviationLevel: number;
    warningMessage: string;
  }> {}
