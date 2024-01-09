export interface IReferral {
  referralPaperDate: Date | string;
  referralOutDate: Date | string;
  referralReason: string;
  sourceLpuName: string;
  targetLpuName: string;
  idReferralType: string;
  profileMedService: string;
  caseAidType: string;
  caseAidForm: string;
  caseAidPlace: string;
  surveyOrgan: string;
  surveyType: string;
  comment: string;
}
