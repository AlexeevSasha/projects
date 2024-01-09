import { IPatient } from "../../common/interfaces/patient/IPatient";
import { actionCreator } from "../../store/action/actionCreator";
import { IMedicalCareCaseCardGetSteps } from "../../common/interfaces/medical/IMedicalCareCaseCardGetSteps";

export class DiseaseMedicalCareCaseCardAction {
  static infoPatient = actionCreator.async<null, IPatient, Error>("DISEASE_MEDICAL_CARE_CASE_CARD/PATIENT_INFO");
  static Steps = actionCreator.async<null, IMedicalCareCaseCardGetSteps[], Error>(
    "DISEASE_MEDICAL_CARE_CASE_CARD/STEPS"
  );
}
