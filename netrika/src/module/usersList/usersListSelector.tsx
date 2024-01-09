import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ usersList }: IAppState) => usersList;

export const usersListSelector = createSelector(state, ({ list, loading, user, snilsUser }) => ({
  list,
  loading,
  user,
  snilsUser,
}));

export const avalableMoSelector = createSelector(state, ({ avalableMo }) =>
  avalableMo.map((item) => ({ label: item.description, value: item.code }))
);

export const userGroupsSelector = createSelector(state, ({ userGroups }) =>
  userGroups.map((item) => ({ label: item.name, value: item.id }))
);

export const workPositionSelector = createSelector(state, ({ workPosition }) =>
  workPosition.map((item) => ({ label: item.description, value: item.code }))
);

export const rolesSelector = createSelector(state, ({ roles, profile }) => {
  return roles
    .map((item) => ({ value: item.name, key: item.id }))
    .filter((el) => (profile.login === "RegistrySuperUsr" ? el : el.key !== 1));
});

export const profileSelector = createSelector(state, ({ profile, loading }) => ({
  profile,
  loading,
}));

export const visibilityChaptersUserSelector = createSelector(state, ({ profile }) => ({
  seeAllChaptersOrder: profile?.seeAllChaptersOrder === undefined ? true : profile.seeAllChaptersOrder,
  seeAllChaptersRegister: profile?.seeAllChaptersRegister === undefined ? true : profile.seeAllChaptersRegister,
}));
