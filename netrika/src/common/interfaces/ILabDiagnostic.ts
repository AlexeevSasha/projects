import { ILabDiagnosticTest } from "./ILabDiagnosticTest";

export interface ILabDiagnostic {
  labDiagnosticGroup: string;
  diagnosticTests: ILabDiagnosticTest[];
}
