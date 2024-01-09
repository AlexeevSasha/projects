import { IPatientRouteStage } from "./IPatientRouteStage";
import { IPatientRoutePoint } from "./IPatientRoutePoint";
import { IPatientRouteDeviation } from "./IPatientRouteDeviation";

export type IPatientRoute = Partial<{
  vmcl: number;
  nosologyCode: number;
  nosologyName: string;
  graphName: string;
  docNumber: string;
  routeMarkup: string;
  routeType: string;
  occasionBeginOn: Date | string;
  occasionEndOn: Date | string;
  occasionPatientId: number;
  birthDate: Date | string;
  genderCode: number;
  childNumber: number;
  stages: Array<IPatientRouteStage>;
  points: Array<IPatientRoutePoint>;
  deviations: Array<IPatientRouteDeviation>;
  linkedRoutes: Array<any>; //  дабавятся позже
}>;
