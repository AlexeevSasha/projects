import { actionCreator } from "../../store/action/actionCreator";
import { IMedicalViolations } from "../../common/interfaces/medical/IMedicalViolations";
import { IClinrec } from "../../common/interfaces/clinrec/IClinrec";
import { IPompResponse } from "../../common/interfaces/IPompResponse";
import { IMedicalViolationsMonthInfo } from "../../common/interfaces/medical/IMedicalViolationsMonthInfo";
import { IMedicalViolationsDayInfo } from "../../common/interfaces/medical/IMedicalViolationsDayInfo";
import { IMedicalViolationsCaseDetails } from "../../common/interfaces/medical/IMedicalViolationsCaseDetails";

export class DiseaseCardPatientManagementAction {
  static infoViolation = actionCreator.async<null, IMedicalViolations, Error>("DiseaseCard/Violation_INFO");
  static calendar = actionCreator.async<null, IMedicalViolationsMonthInfo[], Error>("DiseaseCard/calendar");
  static calendarMonth = actionCreator.async<null, IMedicalViolationsDayInfo[], Error>("DiseaseCard/calendarMonth");
  static calendarDay = actionCreator.async<null, IMedicalViolationsCaseDetails[], Error>("DiseaseCard/calendarDay");

  static infoClinrec = actionCreator.async<null, IClinrec[], Error>("DiseaseCard/Clinrec_INFO");
  static infoPomp = actionCreator.async<null, IPompResponse[], Error>("DiseaseCard/Pomp_INFO");
}
