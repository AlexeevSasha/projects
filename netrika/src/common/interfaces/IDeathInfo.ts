export interface IDeathInfo {
  deathReason: string;
  meddocDoctor: string;
  organization: string;
  certificateN: string;
  certificateS: string;
  deathDate: Date | string;
  deathReasonExternal: string;
  deathReasonImmediate: string;
  deathReasonIntermediate: string;
  deathReasonInitial: string;
  deathReasonPrenatal: string;
  codeMainPrenatal: string;
  codeOtherPrenatal: string;
  deathReasonMother: string;
  codeMainMotherFetalDeath: string;
  codeOtherMotherFetalDeath: string;
}
