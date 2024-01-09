import { BaseApiService } from "./BaseApiService";
import { IFilterDataExcursion } from "../componentPages/pageTickets/toursFilter";
import { ODateResponce } from "../common/interfaces/common";
import { IExcursion } from "./dto/IEscursionTour";

interface IQueryExcursion {
  TypeId?: string | string[];
  ExcursionDate?: string;
  ExcursionDateLt?: string;
}

class ExcursionRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  getExcursionFilterData = () => this.get<IFilterDataExcursion[]>("/Excursion/GetExcursionFilterData", []);

  getExcursionsList = ({ TypeId, ExcursionDate, ExcursionDateLt }: IQueryExcursion) => {
    const oDataQuery = ["$count=true&$includeDeleted=false"];
    const filters = [];
    TypeId && filters.push(`TypeId eq ${TypeId}`);
    ExcursionDate && filters.push(`ExcursionDate gt ${ExcursionDate}`);
    ExcursionDateLt && filters.push(`ExcursionDate lt ${ExcursionDateLt}`);
    filters.length && oDataQuery.push(`&$filter=${filters.join(" and ")}`);

    return this.get<ODateResponce<IExcursion>>(`/odata/ClientExcursion?${oDataQuery.join("&")}`, { value: [] });
  };

  addExcursionInCart = (id: number) => {
    const formData = new FormData();
    formData.append("operation", "add");

    return fetch(`${process.env.NEXT_PUBLIC_MUSEUM_URL}/cart/${id}`, {
      method: "POST",
      body: formData,
      // headers: { "Content-type": "application/x-www-form-urlencoded" },
      credentials: "include",
    }).catch((error) => {
      console.log("request error: ", error);
    });
  };
}

export const excursionRepository = new ExcursionRepository();
