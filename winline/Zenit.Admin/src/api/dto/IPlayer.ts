export interface IAddPlayer {
  firstName: string;
  lastName: string;
  team: {
    id: string;
    name: string;
  };
  season: {
    id: string;
    name: string;
  };
  position: {
    id: string;
    name: string;
    category: string;
  };
  // eslint-disable-next-line id-blacklist
  number: number;
  country: string;
  birthday: string;
  height: number;
  weight: number;
  avatarUri: string;
  profile: {
    biography: string;
    career: [
      {
        id: string;
        period: string;
        club: string;
      }
    ];
  };
  productUrl: string;
  statistics: [
    {
      id: string;
      tournament: string;
      average: {
        points: number;
        selections: number;
        transfers: number;
        effectiveness: number;
      };
      total: {
        points: number;
        selections: number;
        transfers: number;
        effectiveness: number;
      };
    }
  ];
}

export interface IPlayer extends IAddPlayer {
  id: string;
}

export interface IPlayerFilters {
  fullname: string;
  sorting: string;
  pagination: number;
  position: string | undefined;
  team: string | undefined;
}
