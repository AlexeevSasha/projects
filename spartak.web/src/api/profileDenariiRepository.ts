import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";

export interface UserPurchaseDto {
  Id: string;
  PurchaseDateUtc: string;
  Sum: number;
  ShopId: string;
  ShopName: string;
  AccumulatedDenarius: number;
  SpentDenarius: number;
  UserCard: UserCard;
  BonusSum: number;
}

export interface UserTransactionDto {
  Id: string;
  ArticleName: string;
  CampaignName: string;
  ChequeNumber: string;
  Debet: number;
  Credit: number;
  Remainder: number;
  ChargeUtc: string;
  ActiveUtc: string;
  DecrementUtc: string;
  UserCard: UserCard;
}

export interface ToBurnDenarii {
  DecrementUtc?: string;
  Sum?: number;
}

export interface ToActivateDenarii {
  ChargeUtc?: string;
  Sum?: number;
}

interface UserCard {
  Id: string;
  Number: string;
}

type Filter = { pagination?: number; UserCard?: string; sorting?: string; ShopId?: string; IsStatus?: string };

class ProfileDenariiRepository extends BaseApiService {
  constructor() {
    super("profile/");
  }

  fetchUserPurchases = (filters: Filter) =>
    this.get<ODateResponce<UserPurchaseDto>>(
      `odata/UserPurchase${this.getQueryString({
        ...filters,
        ShopId: "ArenaSKD",
        sorting: "PurchaseDateUtc desc",
      })}`,
      {
        value: [],
      }
    );

  fetchUserTransactions = (filters: Filter) =>
    this.get<ODateResponce<UserTransactionDto>>(
      `odata/UserTransaction${this.getQueryString({ ...filters, sorting: "ChargeUtc desc", IsStatus: "false" })}`,
      {
        value: [],
      }
    );

  fetchBurnDenarii = () => this.get<ToBurnDenarii>("UserTransaction/GetDenariiToCombustion", {});

  fetchActivateDenarii = () => this.get<ToActivateDenarii>("UserTransaction/GetDenariiToActivation", {});

  applayPromoCode = (code: string) => this.post<void>(`Receipt/ApplyPromoCode?promoCode=${code}`);

  getQueryString = ({ pagination: currentPage, UserCard, sorting, ...filter }: Filter, pageSize = 10) =>
    this.getODataQuery({
      currentPage,
      pageSize,
      UserCard,
      sorting,
      excludeDeletedUtc: true,
      expand: "UserCard",
      ...filter,
    });
}

export const profileDenariiRepository = new ProfileDenariiRepository();
