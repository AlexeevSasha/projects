import { actionCreator } from "../../store/action/actionCreator";
import { IFunction } from "../../common/interfaces/IFunction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IPatientReportLogItem } from "../../common/interfaces/patient/IPatientReportLogItem";

export class DictionaryPatientReportAction {
  static patientReportList = actionCreator.async<null, IPaginateItems<IPatientReportLogItem[]>, Error>(
    "Dictionary/PatientReport/LIST"
  );
  static patientReportFunction = actionCreator.async<null, IFunction[], Error>("Dictionary/PatientReport/Function");
}
