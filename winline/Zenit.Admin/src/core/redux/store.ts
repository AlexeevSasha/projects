import { roleAccessSlice } from "../../modules/roleAccess/roleAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../modules/authorization/authSlice";
import { employeesSlice } from "../../modules/employees/employeesSlice";
import { usersSlice } from "../../modules/users/usersSlice";
import { employeeRolesSlice } from "../../modules/employeeRoles/employeeRolesSlice";
import { usersNotificationsSlice } from "../../modules/usersNotifications/usersNotificationsSlice";
import { systemLogSlice } from "../../modules/systemLog/systemLogSlice";
import { getStorageAuthData, getStorageUserInfo } from "../../common/helpers/authorization/storageHandlers";
import { commonsSlice } from "../../modules/commons/commonsSlice";
import { advSlice } from "../../modules/adv/advSlice";
import { matchesSlice } from "../../modules/matches/matchesSlice";
import { playersSlice } from "../../modules/players/playersSlice";
import { useDispatch } from "react-redux";
import { storySlice } from "../../modules/story/storySlice";

const store = configureStore({
  reducer: {
    roleAccess: roleAccessSlice.reducer,
    employees: employeesSlice.reducer,
    users: usersSlice.reducer,
    usersNotifications: usersNotificationsSlice.reducer,
    employeeRoles: employeeRolesSlice.reducer,
    authData: authSlice.reducer,
    systemLog: systemLogSlice.reducer,
    commons: commonsSlice.reducer,
    adv: advSlice.reducer,
    matches: matchesSlice.reducer,
    players: playersSlice.reducer,
    story: storySlice.reducer
  },
  preloadedState: {
    authData: {
      authData: getStorageAuthData(),
      userInfo: getStorageUserInfo(),
      isLoading: false
    }
  }
});

export default store;
export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
