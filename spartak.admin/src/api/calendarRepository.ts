import { CalendarEntity, CalendarFiltersType } from "common/interfaces/calendar";
import { BaseResponce } from "common/interfaces/common";
import { BaseApiService } from "./BaseApiService";

const mockItem = {
  Id: "1",
  FullName: {
    En: "Экскурсионные туры в день матча «Спартак» — «Сочи»",
    Ru: "Экскурсионные туры в день матча «Спартак» — «Сочи»",
  },
  ImageUrl: "",
  Status: "Draft",
  CreatedUtc: new Date(2020, 10, 13).toUTCString(),
  EventUtc: new Date(2022, 2, 22).toUTCString(),
  Link: "",
};

class CalendarRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: CalendarFiltersType) => {
    const res = await this.get<BaseResponce<CalendarEntity[]>>(`odata/Calendar?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: CalendarEntity["Id"]) => {
    const { value } = await this.get<BaseResponce<CalendarEntity[]>>(`odata/Calendar?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (entity: CalendarEntity) => await this.post("Calendar/Publish", JSON.stringify(entity));

  draft = async (entity: CalendarEntity) => await this.post("Calendar/Draft", JSON.stringify(entity));

  deleteById = async (id: CalendarEntity["Id"]) => await this.delete(`Calendar/Delete?id=${id}`);
}

export const calendarRepository = new CalendarRepository();
