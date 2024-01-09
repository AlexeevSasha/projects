export interface IPatientDiseaseCard {
  diagnosisCode: string;
  diagnosisName: string;
  diagnosisType: string;
  diagnosisStage: string;
  deathReason: string;
  deathDate: Date | string | null;
  diagnosisDate: Date | string;
  diseaseType: string;
  diseaseStatus: string;
  doctorName: string;
}
