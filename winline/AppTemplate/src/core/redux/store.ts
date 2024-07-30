import { roleAccessSlice } from "../../modules/roleAccess/roleAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../modules/authorization/authSlice";
import { employeesSlice } from "../../modules/employees/employeesSlice";
import { usersSlice } from "../../modules/users/usersSlice";
import { employeeRolesSlice } from "../../modules/employeeRoles/employeeRolesSlice";
import { employeeRemindersSlice } from "../../modules/employeeReminders/employeeRemindersSlice";
import { usersNotificationsSlice } from "../../modules/usersNotifications/usersNotificationsSlice";
import { systemLogSlice } from "../../modules/systemLog/systemLogSlice";
import { getStorageAuthData, getStorageUserInfo } from "../../common/helpers/authorization/storageHandlers";
import { commonsSlice } from "../../modules/commons/commonsSlice";
import { useDispatch } from "react-redux";
import { story } from "../../modules/content/story/storySlice";
import { bannerSlice } from "../../modules/content/banner/bannerSlice";
import { infoPage } from "../../modules/content/infoPage/infoPage/infoPageSlice";
import { imageInfoPage } from "../../modules/content/infoPage/imageInfoPage/imageInfoPageSlice";

const store = configureStore({
  reducer: {
    roleAccess: roleAccessSlice.reducer,
    employees: employeesSlice.reducer,
    users: usersSlice.reducer,
    usersNotifications: usersNotificationsSlice.reducer,
    employeeRoles: employeeRolesSlice.reducer,
    employeeReminders: employeeRemindersSlice.reducer,
    authData: authSlice.reducer,
    systemLog: systemLogSlice.reducer,
    commons: commonsSlice.reducer,
    story: story.reducer,
    banner: bannerSlice.reducer,
    infoPage: infoPage.reducer,
    imageInfoPage: imageInfoPage.reducer
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
