import { getAccessPolicyNameInObject } from "./getAccessName";
import type { IAccess, IAccessFormatted } from "../../../api/dto/employees/IAccess";
import { TFunction } from "react-i18next";

const categoryNames: Record<string, string> = {
  user: "users.title",
  notification: "users.notifications.title",
  employee: "employees.title",
  role: "employees.role.title",
  log: "systemLog.title",
  banner: "adv.title",
  loyalty: "loyalty.title"
  //TODO настроить и раскомментировать
  // club: "employees.role.form.accessBuilders.titles.club"
};

const policyNames: Record<string, string> = {
  none: "employees.role.form.accessBuilders.radioButtons.none",
  read: "employees.role.form.accessBuilders.radioButtons.read",
  write: "employees.role.form.accessBuilders.radioButtons.write"
};

export const formattingAccess = (allAccess: IAccess[], transition: TFunction<"translation">): IAccessFormatted[] =>
  //TODO убрать фильтр, когда отойдем от бэка тимплэйта
  allAccess
    .filter((item) => item.category !== "club")
    .map((access) => {
      const allPolicies = [{ value: `${access.category}.none` }, ...access.policies];
      const formattedAccess: IAccessFormatted = {
        category: transition(categoryNames[access.category]),
        policies: allPolicies.map((policy) => ({
          value: policy.value,
          label: transition(policyNames[getAccessPolicyNameInObject(policy)])
        }))
      };

      return formattedAccess;
    });
