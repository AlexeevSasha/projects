import { BaseFilters } from "common/interfaces/common";
import { store } from "store";
import { authAction } from "store/auth/authSlice";
import { noticeActions } from "store/notice/notice";
import i18n, { t } from "i18next";
import { newDate } from "common/helpers/newDate";
import { toISOString } from "common/helpers/toISOString";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import _ from "lodash";

export class BaseApiService {
  constructor(uri: string) {
    this.url = `${process.env.REACT_APP_API}/${uri}/`;
  }

  protected url: string;

  protected get = <R = any>(uri: string, config?: RequestInit): Promise<R> =>
    this.fetch(uri, this.config({ method: "GET", ...config }));

  protected delete = <T extends BodyInit, R = any>(uri: string, body?: T, config?: RequestInit): Promise<R> =>
    this.fetch(uri, this.config({ method: "DELETE", body, ...config }));

  protected put = <T extends BodyInit, R = any>(uri: string, body: T, config?: RequestInit): Promise<R> =>
    this.fetch(uri, this.config({ method: "PUT", body, ...config }));

  protected post = <T extends BodyInit, R = any>(uri: string, body?: T, config?: RequestInit): Promise<R> =>
    this.fetch(uri, this.config({ method: "POST", body, ...config }));

  private config = (config: RequestInit) => {
    const token = store.getState().auth.authInfo.access_token;
    const headersForToken: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    return {
      ...config,
      headers: {
        ...headersForToken,
        ...(config.headers ? config.headers : { "Content-Type": "application/json" }),
      },
    };
  };

  private fetch = async (uri: string, config?: RequestInit) => {
    const response = await fetch(`${this.url}${uri}`, config).catch(this.handleError);

    return response.ok ? await this.onSuccess(response) : await this.handleError(response);
  };

  private onSuccess = (response: Response) => {
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      return;
    }
    const typeResponse = response.headers.get("Content-Type");

    return typeResponse && /json/.test(typeResponse)
      ? response.json().catch(() => this.handleError(response))
      : response.blob().catch(() => this.handleError(response));
  };

  private handleError = async (response: Response) => {
    if (response.status === 401) {
      store.dispatch(authAction.clearAuthData());
      throw { isValidatorError: true, bodyError: { type: "tokenError" } };
    }

    const error = await response.json();

    if (response.status > 299 || response.status < 200) {
      const message = t(
        error.Title || error.Detail || error.Message
          ? error.Type !== "errors.ValidationException.MediaInfo"
            ? `validations.${error.Title || error.Detail || error.Message}`
            : `validations.allFieldsMustBeFilledException`
          : `back:${error.type}`
      );

      error?.error !== "invalid_grant" && store.dispatch(noticeActions.add({ type: "error", message, timeout: 5000 }));
    }

    throw { status: response.status, bodyError: error };
  };

  protected getODataQuery = <T extends BaseFilters>({
    pagination,
    sorting,
    pageSize = 10,
    withOutDeletedUtc,
    ...filters
  }: T) => {
    const locale = i18n.language === "ru" ? "Ru" : "En";
    const oDataQuery = ["$count=true&"];
    pageSize && oDataQuery.push(`$top=${pageSize}&`);

    pagination && oDataQuery.push(`$skip=${pagination * pageSize - pageSize}&`);

    oDataQuery.push(sorting ? `$orderby=${sorting}` : `$orderby=CreatedUtc desc`);
    !withOutDeletedUtc && oDataQuery.push("&$filter=DeletedUtc eq null");

    const filtersArray = Object.entries(filters).filter(([, value]) => !!value);
    filtersArray.length &&
      oDataQuery.push(
        (withOutDeletedUtc ? "&$filter=" : " and ") +
          filtersArray
            .map(([key, value]) => {
              if (!value) {
                return "";
              }
              switch (key) {
                case "OppositeTeam":
                  return `MatchInfoStat/any(t: contains(tolower(t/Team/Name/${locale}), '${value.toLowerCase()}'))`;
                case "DisplayTeamInTheMedia":
                  return `${key} ${value === "true" ? "eq" : "ne"} true`;
                case "AnyInTeamArray":
                  return `Teams/any(Team: ${value.map((val: string) => `Team/Id eq ${val}`).join(" or ")})`;

                case "ComicSeasonName":
                case "ShortName":
                case "Amplua/Name":
                case "CategoryName":
                case "MediaHeader":
                case "FullName":
                  return `contains(tolower(${key}/${locale}), '${value.toLowerCase()}')`;
                case "Header":
                  return `contains(tolower(${key}/${locale}), '${value.toLowerCase()}')`;
                case "ComicName":
                  return `contains(tolower(Name/${locale}), '${value.toLowerCase()}')`;

                case "TeamsNames":
                  return `(contains(tolower(TeamHome${locale}Name), '${value.toLowerCase()}') or contains(tolower(TeamVisitor${locale}Name), '${value.toLowerCase()}'))`;
                case "Position":
                  return `contains(tolower(${key}), '${value.toLowerCase()}')`;

                case "StartDateSpecialOffer":
                case "EventDate":
                case "CreatedUtc":
                case "MatchDateTime":
                case "PublishDateTime":
                  const gt = toISOString(value.clone().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
                  const lt = toISOString(
                    value.set({
                      hour: 23,
                      minute: 59,
                      second: 59,
                      millisecond: 0,
                    })
                  );

                  //Для фильтрации по StartDate в SpecialOffer от 00.00 до 23.59
                  return `${key === "StartDateSpecialOffer" ? "StartDate" : key} gt ${gt} and ${
                    key === "StartDateSpecialOffer" ? "StartDate" : key
                  } lt ${lt}`;

                case "MatchStartDateTime":
                  const from = toISOString(
                    value[0].set({
                      hour: 0,
                      minute: 0,
                      second: 0,
                      millisecond: 0,
                    })
                  );
                  const to = toISOString(
                    value[1].set({
                      hour: 23,
                      minute: 59,
                      second: 59,
                      millisecond: 0,
                    })
                  );

                  return `${key} gt ${from} and ${key} lt ${to}`;

                case "MatchDate":
                  const valueNew = _.cloneDeep(value);
                  const gtt = toISOString(
                    valueNew.clone().set({ date: valueNew.date(), hour: -4, minute: 59, second: 59, millisecond: 0 })
                  );
                  const ltt = toISOString(
                    valueNew.set({
                      date: valueNew.date(),
                      hour: 21,
                      minute: 0,
                      second: 0,
                      millisecond: 0,
                    })
                  );

                  return `MatchStartDateTime gt ${gtt} and MatchStartDateTime lt ${ltt}`;

                case "MatchStartFromDate":
                  return `MatchStartDateTime gt ${toISOString(
                    value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                  )}`;

                case "StartDate":
                  const startDate = new Date(value);
                  startDate.setHours(0, 0, 0, 0);

                  return `${key} gt ${startDate.toISOString()}`;

                case "EndDate":
                  const endDate = new Date(value);

                  return `${key} lt ${endDate.toISOString()}`;

                case "StartVoting":
                  return `${key} gt ${newDate(value).toISOString()}`;

                case "EndVoting":
                  return `${key} lt ${newDate(value).toISOString()}`;

                case "Teams/Id":
                  return `Teams/any(Teams: Teams/Id eq ${value})`;

                case "Name":
                  return `contains(tolower(Name), '${value.toLowerCase()}')`;

                case "GraduateSectionId":
                case "Tournament/Id":
                case "SeasonId":
                case "RoleId":
                  return `${key} eq ${value}`;

                case "MatchTeamId":
                  return `(${value
                    .map((val: string) => `TeamHomeId eq ${val} or TeamVisitorId eq ${val}`)
                    .join(" or ")})`;

                case "ActivationDate":
                  return `${key} ${value === "true" ? "ne" : "eq"} null`;

                case "IsDraft":
                  return `IsDraft ${value == "true" ? "eq" : "ne"} true`;

                case "SpartakKidsCardNumber":
                  return `startswith(cast(${key}, 'Edm.String'), '${value}')`;

                case "SortOrder":
                  return `${key} eq ${value}`;

                case "MediaStatus":
                  return `IsDraft ${value === "None" ? "eq" : "ne"} true and PublishDateTime ${
                    value === "Planned" ? "gt" : "le"
                  } ${new Date().toISOString()}`;

                case "Promo":
                  return value === "matchPlayer"
                    ? "Match ne null"
                    : value === "monthPlayer"
                    ? "Month ne null"
                    : "SeasonId ne null";
                case "IsAwaiting":
                  return `SentTime ${value === "await" ? "eq " : "ne "}${null}`;

                case "ParentChild":
                  return `(contains(tolower(ParentName), '${value.toLowerCase()}') or contains(tolower(ChildName), '${value.toLowerCase()}'))`;

                case "PhoneEmail":
                  return `startswith(Phone, '${value.replace("+", "")}') or contains(Email, '${value}')`;

                case "StartJournal":
                  return `CreatedUtc gt ${newDate(value).toISOString()}`;

                case "EndJournal":
                  return `CreatedUtc lt ${newDate(value).toISOString()}`;

                case "IdContains":
                  return `(contains(tolower(EntityName), '${value.toLowerCase()}') or contains(tolower(TableName), '${value.toLowerCase()}'))`;

                case "SectionByTeam":
                  return `Teams/any(Team: Team/Section eq '${value}')`;

                case "TrainerSection":
                  return `Teams/any(T: T/Team/Section  eq '${value}')`;

                case "NotNul":
                  return `${value} ne null`;

                case "CustomFilter":
                  return value;

                default:
                  return `${key} eq '${value}'`;
              }
            }, [])
            .join(" and ")
      );

    return oDataQuery.join("");
  };
}
