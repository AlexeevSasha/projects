import type { ILoyaltyProgramFilters } from "../../../api/dto/pointsSystem";

export const generateODataQueryLoyaltyProgram = (filterData: ILoyaltyProgramFilters | undefined) => {
  return filterData?.id ? `$filter=id eq ${filterData.id}` : "$count=true";
};
