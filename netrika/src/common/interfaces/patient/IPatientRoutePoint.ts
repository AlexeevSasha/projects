import { IPatientRouteRecommendation } from "./IPatientRouteRecommendation";

export type IPatientRoutePoint = Partial<{
  moOid: string;
  moName: string;
  isDead: boolean;
  beginOn: Date | string;
  stepNum: number;
  weekNum: number;
  routeNum: number;
  pointName: string;
  stageCode: string;
  stateCode: string;
  isCurrentPoint: boolean;
  deviationCount: number;
  crDeviationCount: number;
  pggDeviationCount: number;
  pompDeviationCount: number;
  criticalDeviationCount: number;
  crCriticalDeviationCount: number;
  pggCriticalDeviationCount: number;
  pompCriticalDeviationCount: number;
  recommendationDate: Date | string;
  recommendations: Array<IPatientRouteRecommendation>;
}>;
