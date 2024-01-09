import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IAbomenent } from "./dto/IAbonement";
import { ISubscription } from "./dto/ISubscription";

interface IProps {
  sorting?: string;
  Id?: string;
}
class AbonementRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchAllAbonements = (defaultValue = {}, access_token?: string) =>
    this.get<IAbomenent[]>(
      "/MatchClient/Subscriptions",
      defaultValue,
      access_token ? { Authorization: `Bearer ${access_token}` } : {}
    );

  fetchSaleEnabledAbonements = () =>
    this.get<ODateResponce<ISubscription>>(
      "/odata/Event?$orderby=EventId%20desc&$filter=Type eq 'Subscription' and IsHidden eq false",
      {
        value: [],
      }
    );

  fetchAbonementsById = (filter: IProps = {}) =>
    this.get<ODateResponce<ISubscription>>(`/odata/ClientEvent?$filter=Id eq ${filter.Id}`, { value: [] });
}

export const abonementRepository = new AbonementRepository();
