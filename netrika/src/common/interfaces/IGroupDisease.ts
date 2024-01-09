import { IAllMedicineWithHistory } from "./IAllMedicineWithHistory";
import { IInstrumentalResearchHistory } from "./IInstrumentalResearchHistory";
import { ILabDiagnostic } from "./ILabDiagnostic";
import { IMedicalCareCase } from "./medical/IMedicalCareCase";
import { IDefaultGroupObservationWithHistory } from "./IObservationWithHistory";
import { IServiceInterventionWithHistory } from "./IServiceInterventionWithHistory";
import { ITreatmentWithHistory } from "./ITreatmentWithHistory";
import { IRefferal } from "./IRefferal";

export interface IGroupDisease {
  anamnesisOfLife:
    | { display: string; name: "observation"; items: IDefaultGroupObservationWithHistory[] }
    | { display: string; name: "medicalCareCase"; items: IMedicalCareCase[] }
    | { display: string; name: "instrumentalResearch"; items: IInstrumentalResearchHistory[] }
    | { display: string; name: "laboratoryDiagnostic"; items: ILabDiagnostic[] };
  anamnesisOfDiseaseDto:
    | { display: string; name: "observation"; items: IDefaultGroupObservationWithHistory[] }
    | { display: string; name: "treatmentWithHistory"; items: ITreatmentWithHistory[] }
    | { display: string; name: "surgicalIntervention"; items: IServiceInterventionWithHistory[] }
    | { display: string; name: "appliedMed"; items: IAllMedicineWithHistory[] };
  referencePlan:
    | { display: string; name: "observation"; items: IDefaultGroupObservationWithHistory[] }
    | { display: string; name: "surgicalIntervention"; items: IServiceInterventionWithHistory[] }
    | { display: string; name: "medicine"; items: IAllMedicineWithHistory[] }
    | { display: string; name: "instrumentalResearch"; items: IInstrumentalResearchHistory[] }
    | { display: string; name: "laboratoryDiagnostic"; items: ILabDiagnostic[] };
  objectiveState:
    | { display: string; name: "observation"; items: IDefaultGroupObservationWithHistory[] }
    | { display: string; name: "laboratoryDiagnostic"; items: ILabDiagnostic[] }
    | { display: string; name: "instrumentalResearch"; items: IInstrumentalResearchHistory[] };
  customBlock:
    | { display: string; name: "observation"; items: IDefaultGroupObservationWithHistory[] }
    | { display: string; name: "instrumentalResearchUsed"; items: IInstrumentalResearchHistory[] }
    | { display: string; name: "laboratoryDiagnosticUsed"; items: ILabDiagnostic[] }
    | { display: string; name: "surgicalInterventionUsed"; items: IServiceInterventionWithHistory[] }
    | { display: string; name: "medUsed"; items: IAllMedicineWithHistory[] }
    | { display: string; name: "instrumentalResearchPrescribed"; items: IInstrumentalResearchHistory[] }
    | { display: string; name: "laboratoryDiagnosticPrescribed"; items: ILabDiagnostic[] }
    | { display: string; name: "surgicalInterventionPrescribed"; items: IServiceInterventionWithHistory[] }
    | { display: string; name: "medPrescribed"; items: IAllMedicineWithHistory[] }
    | { display: string; name: "referral"; items: IRefferal[] };
}
