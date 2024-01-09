import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const authorizationSelector = createSelector(
  ({ authorization }: IAppState) => authorization,
  ({ login, userId, isSuperExpert, loading, iemkPortalRole }) => ({
    login,
    userId,
    isSuperExpert,
    loading,
    iemkPortalRole,
  })
);
