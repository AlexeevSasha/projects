export interface IRoute {
  referralOutDate: Date | string;
  referralTypeName: string;
  referralSurveyTypeName: string;
  referralSurveyOrganName: string;
  referralReasonName: string;
  referralProfileMedService: string;
  referralSourceLpu: string;
  referralTargetLpu: string;
  referralCaseOpenDate: Date | string;
  referralCaseCloseDate: Date | string;
  referralStatus: string;
}
