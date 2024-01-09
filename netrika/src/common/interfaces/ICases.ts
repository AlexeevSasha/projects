import { CalendarEventTypeEnum } from "./CalendarEventTypeEnum";

export interface ICases {
  code: CalendarEventTypeEnum;
  name: string;
  diagnosisCodes: string[];
}
