import { AuthorizationApiRequest } from "api/authorizationApiRequest";
import { BaseRequest } from "../../api/baseRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { AuthorizationAction } from "./authorizationAction";
import { AuthService } from "./AuthService";
import { AuthServiceImk } from "./AuthServiceImk";
import { ConfigurationApiRequest } from "../../api/configurationApiRequest";
import { ILoginResponse } from "../../common/interfaces/ILoginResponse";

export const authorizationThunk = (
  fromPortal?: boolean,
  goToLink?: () => void,
  pathApi?: string,
  callback?: (useId: number) => Promise<void>
): IThunkAction => async (dispatch: IAppDispatch): Promise<void> => {
  try {
    const [user, userImk] = await Promise.all([new AuthService().getUser(), new AuthServiceImk().getUser()]);
    let response: ILoginResponse | null = null;

    if (userImk) {
      BaseRequest.setBearer(userImk.access_token);
      const iemkPortalRole = await new ConfigurationApiRequest().getIemkPortalRole();
      dispatch(AuthorizationAction.iemkPortalRole(iemkPortalRole.result));
      const result = await new AuthorizationApiRequest().login();
      const currentResult = result.result.find(
        (item) => item.claimValue === iemkPortalRole.result || item.claimValue === "RegistryTherapistGroup"
      );
      response = currentResult || result.result[0];
    } else if (user) {
      BaseRequest.setBearer(user.access_token);
      const result = await new AuthorizationApiRequest().login();
      response = result.result[0];
      //TODO, Временное, очень плохое решение. Нужно для  сквозной авторизации если  от портала врача в каках пишется неполный токен, удалить полсе того, как поправят на портале врача.
    } else if (!userImk && fromPortal && goToLink) {
      const responseToken = await new AuthorizationApiRequest(pathApi + "_identity").getAppToken();
      BaseRequest.setBearer(responseToken.access_token);
      const result = await new AuthorizationApiRequest().login();
      response = result.result[0];
    } else {
      dispatch(AuthorizationAction.auth(""));
    }

    if (response) {
      await callback?.(response.userId);
      dispatch(AuthorizationAction.auth(response.claimValue));
      dispatch(AuthorizationAction.userId(response.userId));
      dispatch(AuthorizationAction.isSuperExpert(response.isSuperExpert));
    }

    if (!userImk && fromPortal && goToLink) {
      goToLink();
    }
  } catch (e) {
    console.error("При авторизации произошла ошибка");
  }
};
