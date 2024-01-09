export type PromoDtoShort = {
  Id: string;
  StartDate: string;
  EndDate: string;
  Title: string;
  Description: string;
  ImageUrl: string;
  Winners: number;
  QuantityAwards: number;
  LoyaltyAwardType: "FreeBet" | "VoucherToTheBox" | "CouponForMerchandise" | "ExternalReference" | "FreeBetByPhone";
  Accepted: boolean;
  IsWinner: boolean;
  WinnerText: string | null;
  OutOfStock?: string;
  MatchId: string;
  Month: string;
  SeasonId: string;
  PromotionType: "Loyalty" | "Mvp";
};

export type PromoDto = PromoDtoShort & {
  Award?: {
    PromoCode: string;
    Link: string;
    ButtonText: string;
  };
  NewUser?: boolean;
  NoCondition?: boolean;
  BoughtTicket?: {
    IsActive: boolean;
    MatchName: string;
    SectorNames: string[];
    Quantity: number;
  };
  UserValidation?: {
    BirthDate: string;
    AllowToUseWinline: boolean;
  };
};

export type LoyaltyConditionCheck = {
  LoyaltyId: string;
  IsWinner: boolean;
  Award?: {
    LoyaltyAwardId: string;
    PromoCode: string;
    Link: string;
    ButtonText: string;
  };
  BoughtTicket?: {
    IsCheck: boolean;
    MatchName: string;
    SectorNames: string[];
    Quantity: number;
  };
  NewUserCheck?: boolean;
  NoCondition?: boolean;
  WinnerText: string | null;
};
