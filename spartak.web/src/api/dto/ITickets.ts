import { IMatchDto } from "./IMatchDto";
import { IParkingDto } from "./IParkingDto";
import { LocaleType } from "./LocaleType";

export interface ITickets {
  result: boolean;
  message: string | null;
  list: ITicket[];
  card?: string | null;
}

export interface ITicket {
  id: string;
  pricezoneId: string;
  categoryId: string;
  name: string;
  quant: number;
  price: string;
  orderId: string | null;
  categories: ICategory[];
  calendarId: string;
  logo?: string | null;
  calendarName: string;
  calendarFullName: string;
  calendarDay: string;
  calendarTime: string;
  saleAlgorithmId: number;
  zoneId: string | null;
  fanId?: string | null;
  fanGuid?: string | null;
  requestFanId?: number | null;
}

export interface ICategory {
  id: string;
  name: string;
  price: string;
}

export type DeleteCartTicketsDto = {
  id: string;
};

export interface ICreateOrderTickets {
  result: boolean;
  content: string;
  orderId: string;
}

// Тип для билетов на странице Билеты/Билеты, так же используется для парковок и концертов
export type IEventTickets = {
  Id: string;
  FullName: LocaleType;
  ShortName: LocaleType;
  TotalTickets: number;
  EventStart: string;
  EventId: number;
  GroupLimits: unknown;
} & (
  | { TicketEventType: "Match"; Match: IMatchDto; Parking?: IParkingDto[] }
  | { TicketEventType: "Parking"; Match: undefined; Parking: undefined }
  | { TicketEventType: "Event"; Match: undefined; Parking?: IParkingDto[] }
);
