import { EventType } from "common/interfaces/matches";

export const tempEvents = [
  EventType.matchStart,
  EventType.matchEnd,
  EventType.timeAddStart,
  EventType.secondPeriodStart,
  EventType.timeout,
  EventType.firstHalfOfAdditionalTimeStart,
  EventType.secondHalfOfAdditionalTimeStart,
  EventType.penaltyShootoutStart,
];

export const gameEvents = [
  EventType.autoGoal,
  EventType.goal,
  EventType.replace,
  EventType.yellowCard,
  EventType.secondYellowCard,
  EventType.redCard,
  EventType.var,
  EventType.getPenalty,
  EventType.missedPenalty,
  EventType.goalPenalty,
  EventType.textTranslation,
  EventType.goalPenaltyInGameTime,
  EventType.missedPenaltyInGameTime,
];

export const withDefaultTimeObjects: Record<string, { Half: number; Minute?: number }> = {
  [EventType.matchStart]: { Half: 1, Minute: 1 },
  [EventType.secondPeriodStart]: { Half: 2, Minute: 46 },
  [EventType.firstHalfOfAdditionalTimeStart]: { Half: 3, Minute: 91 },
  [EventType.secondHalfOfAdditionalTimeStart]: { Half: 4, Minute: 106 },
  [EventType.penaltyShootoutStart]: { Half: 5 },
};

export const halfs = {
  2: "halfTwo",
  4: "secondOvertime",
};

export const halfsMinuteObj: Record<string, number> = {
  1: 45,
  2: 90,
  3: 105,
  4: 120,
};

export const otherPlayerFieldTypes = [EventType.replace, EventType.goal, EventType.autoGoal];
export const playerFieldTypes = [
  ...otherPlayerFieldTypes,
  EventType.yellowCard,
  EventType.secondYellowCard,
  EventType.redCard,
  EventType.missedPenalty,
  EventType.goalPenalty,
  EventType.goalPenaltyInGameTime,
  EventType.missedPenaltyInGameTime,
];
export const commandFieldTypes = [...playerFieldTypes, EventType.getPenalty];
export const minuteFieldTypes = [
  ...commandFieldTypes,
  EventType.var,
  EventType.matchEnd,
  EventType.timeout,
  EventType.textTranslation,
  EventType.goalPenalty,
];
export const halfFieldTypes = [...minuteFieldTypes, EventType.timeAddStart];

export const sendPushTypes = [
  EventType.autoGoal,
  EventType.goal,
  EventType.replace,
  EventType.yellowCard,
  EventType.secondYellowCard,
  EventType.redCard,
  EventType.var,
  EventType.getPenalty,
  EventType.missedPenalty,
  EventType.goalPenalty,
  EventType.textTranslation,
  EventType.goalPenaltyInGameTime,
  // EventType.missedPenaltyInGameTime,
];
