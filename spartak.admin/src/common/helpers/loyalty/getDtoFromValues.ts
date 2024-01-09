import { LoyaltyEntity } from "common/interfaces/loyalty";
import moment from "moment";
import { AdditionalLoyaltyFormValues, LoyaltyFormValues } from "pages/loyalty/LoyaltyForm";
import { toISOString } from "../toISOString";
import { viewDate } from "../viewDate";

export const getLoyaltyDtoFromValues = (values: LoyaltyFormValues): LoyaltyEntity => {
  const {
    DateRange = [],
    ExistCondition,
    NewUser,
    BoughtTicket,
    EventId,
    SectorIds,
    Quantity,
    Condition,
    ...dto
  } = values;

  const StartDate = toISOString(moment(+DateRange[0] - 10800000));
  const EndDate = toISOString(moment(+DateRange[1] - 10800000));
  const WinCondition: LoyaltyFormValues["Condition"]["WinCondition"] = [];

  if (!ExistCondition) {
    WinCondition.push({ Type: "NoCondition" });
  } else {
    BoughtTicket && WinCondition.push({ Type: "BoughtTicket", EventId, SectorIds, Quantity });
    NewUser && WinCondition.push({ Type: "NewUser" });
  }

  return { ...dto, StartDate, EndDate, Condition: { ...Condition, WinCondition } };
};

export const getValuesFromDto = (value: LoyaltyEntity) => {
  const { StartDate, EndDate, Condition, ...loyalty } = value;

  const noCondition = Condition.WinCondition[0].Type === "NoCondition";
  const fields = noCondition
    ? [{ ExistCondition: false }]
    : Condition.WinCondition.reduce(
        (acc: AdditionalLoyaltyFormValues, { Type, EventId, SectorIds, Quantity }) => {
          return (
            (Type === "NewUser" && { ...acc, NewUser: true }) ||
            (Type === "BoughtTicket" && { ...acc, BoughtTicket: true, EventId, SectorIds, Quantity }) ||
            acc
          );
        },
        { ExistCondition: true }
      );

  return {
    ...loyalty,
    DateRange: [moment(viewDate(StartDate)), moment(viewDate(EndDate))],
    Condition,
    ...fields,
  } as LoyaltyFormValues;
};
