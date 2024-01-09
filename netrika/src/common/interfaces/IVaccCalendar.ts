/** VaccinationList */
export interface IVaccinationResponse {
  vaccinationList: IVaccList[];
}

export interface IVaccList {
  status: string;
  statusCode?: string;
  infCode?: string;
  vaccDate?: string;
  vacType: string;
}

/** VaccCalendar */
export interface IVaccCalendarResponse {
  vaccinationCalendar: IVaccinationCalendar[];
}

export interface IVaccinationCalendar {
  code: number;
  display: string;
  isNational?: boolean;
  isEpid: boolean;
}

/** VaccType */
export interface IVaccTypeResponse {
  vaccinationType: string[];
}

/** VaccCalendarType */
export interface IVaccCalendarTypeResponse {
  vaccCalendarType: IVaccCalendarType[];
}

export interface IVaccCalendarType {
  code: number;
  display: string;
}
