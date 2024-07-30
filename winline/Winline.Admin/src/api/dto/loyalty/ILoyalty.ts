import { Moment } from "moment";

export interface ILoyalty {
  id: string;
  name: string;
  outOfStock: string;
  startDate: string;
  endDate: string;
  createdUtc: string;
  clubId: string;
  totalAward: number;
  title: string;
  description: string;
  imageUploader: string;
  status: string;
  club: {
    id: string;
    email: string;
    clubName: string;
    enabled: boolean;
  };
  condition: {
    id: string;
    winCondition: [
      {
        type: string;
        matchName: string | null;
        matchId: string;
        sectorId: string;
        sectorName: string | null;
        quantity: number;
      }
    ];
    award: {
      type: string;
      uploadFile: string;
      quantity: number;
      link: string;
      buttonText: string;
    };
    availabilityCondition: {
      type: string;
      uploadFile: string;
    };
  };
  acceptUser: {
    id: string;
    total: number;
  };
  winnerUser: {
    id: string;
    total: number;
  };
}

export interface ILoyaltyType {
  id: string;
  name: string;
}

export interface IEvents {
  eventId: string;
  eventName: string;
}

export interface ISectors {
  sectorId: string;
  sectorName: string;
}

export interface ILoyaltyFilters {
  id?: string;
  name: string;
  clubId: string;
  status?: string;
  date: [Moment, Moment] | null;
  pagination: number;
  sorting: string;
}
