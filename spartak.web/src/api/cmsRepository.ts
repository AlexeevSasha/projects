import { BaseApiService } from "./BaseApiService";

interface IPlayerFilters {
  Type?:
    | "clubContacts"
    | "clubHistory"
    | "clubLeaders"
    | "clubResults"
    | "stadiumAbout"
    | "stadiumContacts"
    | "stadiumHowToGet"
    | "stadiumStaff"
    | "stadiumUsefulInfo"
    | "servicesAdjacentTerritory"
    | "servicesVip"
    | "academyEnter"
    | "loyaltyPartnersOffers"
    | "chairPlotting"
    | "loyaltyRules"
    | "spartakKids"
    | "kidsRules"
    | "kidsComics"
    | "excursionTours"
    | "mainPage"
    | "matches"
    | "matchInfo"
    | "legends"
    | "mediaNews"
    | "corporateClients"
    | "ticketsInvalidPlaces"
    | "privacy"
    | "ticketsPremium"
    | "ticketsFamilySector"
    | "academyInfrastructure";
}

interface ICmsValue {
  Id: string;
  Type: IPlayerFilters["Type"];
  JsonData: string;
}

class CmsRepository extends BaseApiService {
  constructor() {
    super("admin");
  }
  fetchCms = (filter?: IPlayerFilters) =>
    this.get<{ value: ICmsValue[] }>(`/odata/Cms${filter ? `?$filter=Type eq '${filter.Type}'` : ""}`, { value: [{}] });
}

export const cmsRepository = new CmsRepository();
