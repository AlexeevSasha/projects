import { ILabDiagnosticHistory } from "./ILabDiagnosticHistory";

export interface ILabDiagnosticTest {
  labDiagnosticTestName: string;
  labDiagnosticGroupName: string;
  labDiagnosticResult: string;
  labDiagnosticDate: Date | string;
  labHistory: ILabDiagnosticHistory[];
}
