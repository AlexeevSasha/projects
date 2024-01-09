import { BaseApiService } from "./BaseApiService";
import { LoyaltyConditionCheck, PromoDto, PromoDtoShort } from "./dto/loyalty";

interface IAdvertisementFilters {
  Page: number;
  Size: number;
  yearFilter?: string;
}

class AdvertisementRepository extends BaseApiService {
  constructor(url: string) {
    super(url);
    this.url = url;
  }

  getLoyaltiesForAccept = (filter: IAdvertisementFilters) =>
    this.get<{ Loyalty?: PromoDtoShort[]; UserValidation?: string; Count: number }>(
      `/LoyaltyUser/GetLoyaltiesForAccept?${this.getFilters(filter)}&api-version=2.0`,
      { Loyalty: [], UserValidation: null, Count: 0 }
    );

  getLoyaltiesHistory = (filter: IAdvertisementFilters) =>
    this.get<{ LoyaltyConditionInfos: PromoDto[]; UserValidation?: string; Count: number }>(
      `/LoyaltyUser/GetLoyaltiesHistory?${this.getFilters(filter)}&api-version=1.0`,
      { LoyaltyConditionInfos: [], UserValidation: null, Count: 0 }
    );

  getLoyaltyById = (id: string) =>
    this.get<{ Condition?: PromoDto; UserValidation?: string }>(
      `/LoyaltyUser/GetLoyaltyById?loyaltyId=${id}&api-version=1.0`,
      { Condition: undefined, UserValidation: null }
    );

  addLoyaltyUserAccept = (id: string) =>
    this.post<{ LoyaltyConditionCheck: LoyaltyConditionCheck; UserValidation?: string }>(
      `/LoyaltyUser/AddLoyaltyUserAccept?loyaltyId=${id}&api-version=1.0`
    );
}

export const advertisementRepository = new AdvertisementRepository(`${process.env.NEXT_PUBLIC_BACK_URL}/advertisement`);
