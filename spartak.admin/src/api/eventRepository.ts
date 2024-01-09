import { SectorDto } from "common/interfaces/event";
import { BaseApiService } from "./BaseApiService";

class EventRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchSectors = (eventId: string) => this.get<SectorDto[]>(`Event/GetSectors?eventId=${eventId}`);
}

export const eventRepository = new EventRepository();
