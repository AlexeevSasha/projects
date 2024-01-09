import { IMedDoc } from "./IMedDoc";

export interface IMedicalCareCaseCardGetSteps {
  stepBizKey: number;
  dateStart: Date | null;
  dateEnd: Date | null;
  hospitalDepartment: string;
  hospitalDepartmentId: string;
  doctorName: string;
  doctorPosName: string;
  diagnoseName: string;
  medDocs: IMedDoc[];
}
