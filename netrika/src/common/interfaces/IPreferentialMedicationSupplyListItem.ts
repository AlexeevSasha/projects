export interface IPreferentialMedicationSupplyListItem {
  prescribedMedOrganization: string;
  fullName: string;
  status: string;
  series: string;
  number: string;
  courseDose: number;
  medicineName: string;
  medicineUseWay: string;
  anatomicTherapeuticChemicalClassificationCode: string;
  idPersonMis: string;
  issuedDate: Date | string;
  lloAnatomictherapeuticchemicalclassificationGroup: string;
}
