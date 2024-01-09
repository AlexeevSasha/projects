import { capitalizeNames } from "common/helpers/capitalizeNames";
import { transformKeysEntities } from "common/helpers/transformKeysToLowerCase";
import { User, UserFilters } from "../common/interfaces/user";
import { BaseApiService } from "./BaseApiService";

class UsersRepository extends BaseApiService {
  constructor() {
    super("mobile");
  }

  getUsers = async (filters: UserFilters) => {
    const response = await this.get(`odata/User?${this.oDataQuery(filters)}`);
    const users = transformKeysEntities<User>(response.value);

    return { users, count: response["@odata.count"] };
  };

  private oDataQuery = (filtersData: UserFilters) => {
    const sizePage = 10;
    let oDataQuery = "$count=true";

    if (filtersData.pagination) {
      const skipValue = filtersData.pagination * sizePage - sizePage;
      oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
    }

    if (filtersData.FullName || filtersData.date) {
      const filters: string[] = [];

      // +7 (777) 777-77-77 - проверка
      if (/^\+\d\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/g.test(filtersData?.FullName || "")) {
        filters.push(
          `contains(phone, '${encodeURIComponent((filtersData?.FullName || "").replace(/[\s()\-+]/g, ""))}')`
        );
      } else if (filtersData.FullName) {
        filters.push(`(contains(lastName, '${capitalizeNames(
          filtersData.FullName.split(" ")[0].replace(/'/g, "%27%27")
        )}')
              or contains(firstName, '${capitalizeNames(filtersData.FullName.split(" ")[0].replace(/'/g, "%27%27"))}')
              or contains(email, '${filtersData.FullName.replace(/'/g, "%27%27").toLowerCase()}'))`);
      }

      oDataQuery += `&$filter=${filters.join(" and ")}`;
    }

    if (filtersData.sorting) {
      oDataQuery += `&$orderby=${filtersData.sorting}`;
    } else {
      oDataQuery += `&$orderby=createdUtc desc`;
    }

    return oDataQuery;
  };
}

export const usersRepository = new UsersRepository();
