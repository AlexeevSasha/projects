import { CommonToolsApiRequest } from "api/сommonToolsApiRequest";
import { IUsersRequest } from "common/interfaces/user/IUsersRequest";
import { UserApiRequest } from "api/userApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { UsersListAction } from "./usersListAction";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";

export const UserListThunk = {
  getList(pageSize: number, pageIndex: number, usersRequestDto: IUsersRequest): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(UsersListAction.list.started(null));
      try {
        const result = await new UserApiRequest().getUserList(pageSize, pageIndex, usersRequestDto);
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(UsersListAction.list.failed({ params: null, error }));
      }
    };
  },

  getProfile(userId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(UsersListAction.profile.started(null));
      try {
        const result = await new UserApiRequest().getUser(userId);

        if (result.isError) {
          throw result;
        }

        dispatch(UsersListAction.profile.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(UsersListAction.profile.failed({ params: null, error }));
      }
    };
  },

  getUser(userId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(UsersListAction.user.started(null));
      try {
        const result = await new UserApiRequest().getUser(userId);
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.user.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(UsersListAction.user.failed({ params: null, error }));
      }
    };
  },

  getDoctorINfo(snils: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(UsersListAction.snilsUser.started(null));
      try {
        const result = await new CommonToolsApiRequest().getDoctorINfo(snils);
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.snilsUser.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(UsersListAction.snilsUser.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getAvailableMoWithFilter(data: { pageIndex: number; pageSize: number; search: string }): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new CommonToolsApiRequest().getAvailableMoWithFilter(data);
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.avalableMo(result.result.items));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getUserGroups(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new CommonToolsApiRequest().getUserGroups();
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.userGroups(result.result));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getWorkPosition(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new CommonToolsApiRequest().getWorkPosition();
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.workPosition(result.result));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getRoles(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new CommonToolsApiRequest().getRoles();
        if (result.isError) {
          throw result;
        }
        dispatch(UsersListAction.roles(result.result));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  deleteUser(id: number, pageSize: number, pageIndex: number, usersRequestDto: IUsersRequest): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new UserApiRequest().deleteUser(id);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
        await dispatch(UserListThunk.getList(pageSize, pageIndex, usersRequestDto));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
