import { getCookie } from "../assets/constants/getCookie";
// import { setUserCookie } from "../assets/helpers/setUserCoockie";
import { BaseFilters, BaseODataFilters } from "../common/interfaces/common";
import { refreshToken } from "../core/refreshToken";

// const isDev = process.env.NODE_ENV !== "production";

export type DefaultValue = [] | Record<string, unknown> | string | null;

export class BaseApiService {
  constructor(uri: string) {
    this.url = `${process.env.NEXT_PUBLIC_BACK_URL}/${uri}`;
  }

  protected url: string;

  protected get = <T extends unknown>(
    uri: string,
    defaultValue?: DefaultValue,
    headers: RequestInit["headers"] = { "content-type": "application/json" }
  ): Promise<T> => {
    const access_token = getCookie("access_token");
    const commonHeaders = { Authorization: `Bearer ${access_token}`, ...headers };

    // console.log("\x1b[37m", "GET: ", `${this.url}${uri}`);
    // console.time(`${this.url}${uri}`);
    return fetch(`${this.url}${uri}`, { method: "GET", headers: commonHeaders })
      .then((res) => {
        // console.timeEnd(`${this.url}${uri}`);
        return res.ok ? this.onSuccess(res, defaultValue) : this.handleError(undefined, res, defaultValue);
      })
      .catch((error) => {
        // console.timeEnd(`${this.url}${uri}`);
        return this.handleError(error, undefined, defaultValue);
      });
  };

  protected post = <T extends unknown>(
    uri: string,
    body?: string,
    defaultValue?: DefaultValue,
    headers: RequestInit["headers"] = { "content-type": "application/json" }
  ): Promise<T> => {
    const access_token = getCookie("access_token");
    const commonHeaders = { Authorization: `Bearer ${access_token}`, ...headers };

    // isDev && console.log("\x1b[37m", "POST: ", uri);
    console.time(`${this.url}${uri}`);
    return fetch(`${this.url}${uri}`, { body, method: "POST", headers: commonHeaders })
      .then((res) => {
        console.timeEnd(`${this.url}${uri}`);
        return res.ok ? this.onSuccess(res, defaultValue) : this.handleError(undefined, res, defaultValue);
      })
      .catch((error) => {
        console.timeEnd(`${this.url}${uri}`);
        return this.handleError(error, undefined, defaultValue);
      });
  };

  protected delete = (uri: string, headers: RequestInit["headers"] = { "content-type": "application/json" }) => {
    const access_token = getCookie("access_token");
    const commonHeaders = { Authorization: `Bearer ${access_token}`, ...headers };

    // isDev && console.log("\x1b[37m", "DELETE: ", uri);
    console.time(`${this.url}${uri}`);
    return fetch(`${this.url}${uri}`, { method: "DELETE", headers: commonHeaders })
      .then((res) => {
        console.timeEnd(`${this.url}${uri}`);
        return res.ok ? this.onSuccess(res, null) : this.handleError(undefined, res, null);
      })
      .catch((error) => {
        console.timeEnd(`${this.url}${uri}`);
        return this.handleError(error, undefined, null);
      });
  };

  protected put = <T extends unknown>(
    uri: string,
    body?: string,
    defaultValue?: DefaultValue,
    headers: RequestInit["headers"] = { "content-type": "application/json" }
  ): Promise<T> => {
    const access_token = getCookie("access_token");
    const commonHeaders = { Authorization: `Bearer ${access_token}`, ...headers };

    return fetch(`${this.url}${uri}`, { body, method: "PUT", headers: commonHeaders })
      .then((res) => {
        return res.ok ? this.onSuccess(res, defaultValue) : this.handleError(undefined, res, defaultValue);
      })
      .catch((error) => {
        return this.handleError(error, undefined, defaultValue);
      });
  };

  protected fetchShopAndTickets = <T extends unknown>(
    url: string,
    defaultValue?: any,
    init?: any //RequestInit
  ): Promise<T> => {
    // isDev && console.log("\x1b[37m", "GET: ", url);
    const controller = new AbortController();
    const timeout = this.url.startsWith(`${process.env.NEXT_PUBLIC_SHOP_URL_BACK}`) ? 4000 : 60000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    console.time(`${this.url}${url}`);
    return fetch(`${this.url}${url}`, { ...init, signal: controller.signal })
      .then((res) => {
        console.timeEnd(`${this.url}${url}`);
        res.ok && clearTimeout(timeoutId);
        return res.ok ? this.onSuccess(res, defaultValue) : this.handleError(undefined, res, defaultValue);
      })
      .catch((error) => {
        console.timeEnd(`${this.url}${url}`);
        return this.handleError(error, undefined, defaultValue);
      });
  };
  protected fetchShopAndExcursion = <T extends unknown>(
    url: string,
    defaultValue?: any,
    init?: any //RequestInit
  ): Promise<T> => {
    // isDev && console.log("\x1b[37m", "GET: ", url);
    const controller = new AbortController();
    //const timeout = this.url.startsWith(`${process.env.NEXT_PUBLIC_SHOP_URL_BACK}`) ? 4000 : 60000;
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    console.time(`${url}`);
    return fetch(`${url}`, { ...init, signal: controller.signal })
      .then((res) => {
        console.timeEnd(`${url}`);
        res.ok && clearTimeout(timeoutId);
        return res.ok ? this.onSuccess(res, defaultValue) : this.handleError(undefined, res, defaultValue);
      })
      .catch((error) => {
        console.timeEnd(`${url}`);
        return this.handleError(error, undefined, defaultValue);
      });
  };

  private onSuccess = (res: Response, defaultValue: DefaultValue = []) => {
    return res.status > 299 || res.status < 200
      ? this.handleError(undefined, res, defaultValue)
      : res
          .json()
          .then((value) => value || defaultValue)
          .catch(() => defaultValue);
  };

  private handleError = async (requestError?: unknown, res?: Response, defaultValue?: DefaultValue) => {
    if (res?.url.includes("/local/api/lk/favourites")) return defaultValue;
    if (String(requestError)?.includes("Failed to fetch")) return defaultValue;

    if (res?.status === 401 && typeof window !== "undefined") {
      await refreshToken();
      // const refreshStatus = await refreshToken();
      // if (refreshStatus === "error") {
      // setUserCookie({ expires_in: -1 });
      // location.assign(`/auth/signin?backUrl=${encodeURIComponent(window.location.href)}`);
      // }
      // if (refreshStatus === "success") {
      //   location.reload();
      // }
      return defaultValue;
    }

    const error = requestError || (await res?.json().catch(() => undefined));
    const errorMsg =
      (error as any)?.Message || (error as any)?.Title || (error?.split && error.split("at ")[0]) || error;

    console.log(`\x1b[31m${res?.status}: \x1b[37m${res?.url}\r\n ${errorMsg ? `Error: ${errorMsg}` : ""}`);

    if (defaultValue === undefined) throw error;

    return defaultValue;
  };

  protected queryParams = (obj: Record<string, string | number | null | undefined>) =>
    Object.entries(obj)
      .map(([key, value]) => (value ? `${key}=${value}` : ""))
      .filter((item) => !!item)
      .join("&");

  protected getFilters = <T extends BaseFilters>(filters: T) => {
    const queryFilters = [];
    const filtersArray = Object.entries(filters).filter(([, value]) => !!value);
    filtersArray.length &&
      queryFilters.push(
        filtersArray
          .map(([key, value]) => {
            if (!value) {
              return "";
            }

            return `${key}=${value}`;
          }, [])
          .join("&")
      );
    return queryFilters.join("&");
  };

  protected getODataQuery = <T extends BaseODataFilters>({
    currentPage,
    sorting,
    pageSize,
    expand,
    excludeDeletedUtc,
    ...filters
  }: T) => {
    const oDataQuery = ["?$count=true&"];

    expand && oDataQuery.push(`$expand=${expand}&`);
    pageSize && oDataQuery.push(`$top=${pageSize}&`);
    pageSize && currentPage && oDataQuery.push(`$skip=${currentPage * pageSize - pageSize}&`);
    sorting && oDataQuery.push(`$orderby=${sorting}&`);

    const filtersArray = Object.entries(filters).filter(([, value]) => !!value);
    filtersArray.length && oDataQuery.push(`$filter=${excludeDeletedUtc ? "" : "DeletedUtc eq null"}`);

    filtersArray.length &&
      oDataQuery.push(
        (excludeDeletedUtc ? "" : " and ") +
          filtersArray
            .map(([key, value]) => {
              switch (key) {
                case "DisplayMatchesOnTheSite":
                case "DisplayTeamInTheMedia":
                case "DisplayTeamInfoOnTheSite":
                  return `${key} ${value === "true" ? "eq" : "ne"} true`;
                case "PlayersIds":
                  return `PlayersIds/any(t: t eq ${value})`;
                case "TeamsIds":
                  return `TeamsIds/any(t: t eq ${value})`;
                case "InTeamArray":
                  return `Teams/any(Team:Team/Id eq ${value})`;

                case "DateFrom":
                  return `${key} gt ${value}`;
                case "DateTo":
                  return `${key} lt ${value}`;

                case "PublishDateTimeGt":
                  return `PublishDateTime gt ${value}`;
                case "PublishDateTimeLt":
                  return `PublishDateTime lt ${value}`;

                case "PublishDateTime":
                  return `PublishDateTime le ${new Date().toISOString()}`;

                case "NotId":
                  return `Id ne ${value}`;
                case "StaffCoachesTeam":
                  return `Teams/any(t: t/Id eq ${value})`;
                case "StaffSection":
                  return `Teams/any(t: t/Section eq '${value}')`;
                case "coachesTeam":
                  return `Teams/any(t: t/Team/Id eq ${value})`;
                case "MatchStartDateTime":
                  return `Match/any(Match: Match/${key} gt ${value})`;
                case "SortOrder":
                  return `SortOrder eq ${value}`;
                case "MediaHeader":
                  return value === "ru" ? "" : `MediaHeader/${value} ne null`;

                case "IsStatus":
                case "ComicSeasonId":
                case "MediaCategoryId":
                case "Id":
                case "IsDraft":
                case "GraduateSectionId":
                case "MatchId":
                  return `${key} eq ${value}`;
                case "coachSection":
                  return `Section eq '${value}'`;
                case "UserCard":
                  return `${key}/Id eq ${value}`;

                case "ShopId":
                  return `${key} ne '${value}'`;

                default:
                  return `${key} eq '${value}'`;
              }
            }, [])
            .filter((elem) => elem)
            .join(" and ")
      );

    return oDataQuery.join("");
  };
}
