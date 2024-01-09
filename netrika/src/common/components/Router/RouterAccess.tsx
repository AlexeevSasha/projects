import { RouterNSI } from "common/components/Router/RouterNSI";
import { RouterProfile } from "common/components/Router/RouterProfile";
import { RouterUsers } from "common/components/Router/RouterUsers";
import { PageGoToLogin } from "pages/PageGoToLogin";
import { AuthService } from "module/authorization/AuthService";
import { UserListThunk } from "module/usersList/usersListThunk";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { UserRolesEnum } from "../../interfaces/user/UserRolesEnum";
import { PageLoading } from "../../../pages/PageLoading";
import { RouterDictionary } from "./RouterDictionary";
import { RouterDiseaseCard } from "./RouterDiseaseCard";
import { RouterProposal } from "./RouterProposal";
import { RouterRegister } from "./RouterRegister";
import { PageAccessDenied } from "../../../pages/PageAccessDenied";
import { authorizationSelector } from "../../../module/authorization/authorizationSelector";
import { authorizationThunk } from "../../../module/authorization/authorizationThunk";
import { ConfigurationThunk } from "../../../module/configuration/configurationThunk";
import { RouterRegistry } from "./RouterRegistry";
import { useLocation } from "react-router";
import { AppSettings } from "../../constants/appSettings";

export const RouterAccess = () => {
  const { login, loading, iemkPortalRole } = useSelector(authorizationSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const getProfile = useCallback(
    async (id: number) => {
      if (!id) return;
      await dispatch(UserListThunk.getProfile(id));
    },
    [dispatch]
  );

  useEffect(() => {
    let pathApi = "";
    if (location.search.includes("?fromIemkPortal=true")) {
      window["fromIemkPortal"] = true;
      const apiIndex = document.location.pathname.search("_ui");
      pathApi = document.location.pathname.slice(0, apiIndex);
    }
    dispatch(
      authorizationThunk(window["fromIemkPortal"], () => history.push(window["fromIemkPortal"]), pathApi, getProfile)
    );
  }, [dispatch, location.search, history, getProfile]);

  useEffect(() => {
    Promise.all([
      dispatch(ConfigurationThunk.getContingentOption()),
      dispatch(ConfigurationThunk.getCheckControlEventsOption()),
      dispatch(ConfigurationThunk.getShowUserPasswordOption()),
    ]).then();
  }, [dispatch]);

  const renderSwitch = useCallback(() => {
    switch (login) {
      case UserRolesEnum.RegistryAdmin:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={RouterProposal}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={RouterRegister}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={RouterDictionary}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={RouterNSI} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users`} key="Users" component={RouterUsers} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );

      case UserRolesEnum.RegistryExpert:
      case UserRolesEnum.RegistrySuperExpert:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={RouterProposal}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={RouterRegister}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={RouterDictionary}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={RouterNSI} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/Router`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );

      case UserRolesEnum.RegistryTherapist:
      case iemkPortalRole:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={PageAccessDenied}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={PageAccessDenied}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={PageAccessDenied}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={PageAccessDenied} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );

      case UserRolesEnum.RegistryDiseaseKurator:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={RouterProposal}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={RouterRegister}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={RouterDictionary}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={RouterNSI} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );

      case UserRolesEnum.RegistryOrgCurator:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={RouterProposal}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={RouterRegister}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={RouterDictionary}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={RouterNSI} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );

      case UserRolesEnum.RegistrySuperUsr:
        return (
          <Switch>
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`}
              key="RouterRegisterRouter"
              component={RouterRegistry}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/:registerId/:patientId`}
              key="cards"
              component={RouterDiseaseCard}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}
              key="Proposal"
              component={RouterProposal}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`}
              key="Register"
              component={RouterRegister}
            />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`}
              key="Dictionary"
              component={RouterDictionary}
            />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key="NSI" component={RouterNSI} />
            <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users`} key="Users" component={RouterUsers} />
            <Route
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}
              key="Profile"
              component={RouterProfile}
            />

            <Redirect from={"/"} to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} />
          </Switch>
        );
      default: {
        // Костыль, если пользователь пришёл по URL .../registry_platform_ui/ - то сразу редиректить на авторизацию
        if (window.location.pathname === `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/`) {
          const authService = new AuthService();
          authService.login();
          return <PageLoading />;
        } else {
          return <Route path={"/"} key="all" component={PageGoToLogin} />;
        }
      }
    }
  }, [iemkPortalRole, login]);

  return loading ? <PageLoading /> : renderSwitch();
};
