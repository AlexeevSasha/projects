import { BaseApiService } from "./BaseApiService";
import { EventEntityDto } from "./dto/EventEntity";

interface CalendaEventsrFilters {
  teamId?: string;
  dateStart?: string;
  dateEnd?: string;
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const _filters: CalendaEventsrFilters = {
  dateStart: new Date(year, month - 1, 1, 3).toISOString(),
  dateEnd: new Date(year, month + 2, 1, 2).toISOString(),
};

class CalendarEventsRepository extends BaseApiService {
  constructor() {
    super("match/CalendarEvents/");
  }

  fetchCalendarEvents = (filters: CalendaEventsrFilters) =>
    this.get<EventEntityDto[]>(`Get${filters ? `?${this.getFilters({ ..._filters, ...filters })}` : ""}`);
}

export const calendarEventsRepository = new CalendarEventsRepository();
