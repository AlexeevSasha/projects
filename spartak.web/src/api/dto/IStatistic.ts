export interface IStatisticsData extends Record<string, number> {
  BallPossession: number;
  Corners: number;
  Offsides: number;
  Shots: number;
  ShotsOnTarget: number;
  ShotsOnPostOrBar: number;
  Fouls: number;
  GoalMoments: number;
}

export interface IStatistic {
  HomeTeam: IStatisticsData;
  GuestTeam: IStatisticsData;
}
