import { IAppSettingsRequest } from "../interfaces/IAppSettingsRequest";

const initial = {
  REACT_APP_ROOT_FOLDER: "/release2/registry_platform_ui",
  REACT_APP_API_URL: "/release2/registry_platform",
  REACT_APP_API_ROUTER_URL: "/release2/registry_platform_router",
  authority: "http://dev.zdrav.netrika.ru/release2/registry_platform_identity",
  authorityImk: "http://dev.zdrav.netrika.ru/acs2/acs",
  clientId: "rp_client",
  clientScope: "openid profile",
  responseType: "code",
  clientSecret: "password",
  ExlabUI_URL: "http://192.168.136.43/ExlabUI/Patient/",
  REACT_APP_SQL_LAB: "http://192.168.136.35/superset/sqllab",
  show_screen_route: true,
  redirect_uri: "/signin-callback.html",
  redirect_uri_iemk: "/signin-callback-iemk.html",
  region_name: "",
};

class AppSettingsClass {
  public loaded: boolean;
  private setting: IAppSettingsRequest;

  constructor() {
    this.setting = initial;
    this.loaded = false;
  }

  public get<T extends keyof IAppSettingsRequest>(key: T): IAppSettingsRequest[T] {
    return this.setting[key];
  }

  public set(setting: IAppSettingsRequest) {
    this.setting = { ...this.setting, ...setting };
    this.loaded = true;
  }
}

export const AppSettings = new AppSettingsClass();
