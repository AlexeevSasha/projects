import { UserT } from "../interfaces/UserT";
import { getRolesValue } from "../constants/getRolesValue";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { createArrayRoles } from "../constants/createArrayRoles";
import { UserRoleT } from "../interfaces/UserRoleT";
import { getCurrentRoles, setCurrentRoles } from "../constants/currentRoles";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  user: UserT;
}

export const ChoiceRole = ({ user }: IProps) => {
  const router = useRouter();
  const lang = getLanguage(router.locale);
  const [role, setRole] = useState<UserRoleT | "">("");
  const roles = useMemo(() => createArrayRoles(user), [user]);

  useEffect(() => {
    setRole(getCurrentRoles(user));
  }, []);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as UserRoleT;
    setRole(setCurrentRoles(value));
    router.reload();
  };

  if (!role) return null;
  return (
    <div className={"p-4"}>
      <hr />
      <div className={"pt-5"}>
        {user.userRole !== "Client" && user.userRole !== "Guest" ? (
          <div className={"inline-block bg-green-300 p-3 pt-5"}>
            {lang.common.profile.your_current_role}:
            <strong className={"pl-2 text-xl"}>{getRolesValue(lang)[role]}</strong>
          </div>
        ) : null}
        {roles.length > 1 && (
          <div className={"mt-5 "}>
            <div className={"mb-1 font-bold"}>{lang.common.profile.choose_role}</div>
            <select
              value={role}
              id="roles-choice"
              className="block w-full w-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={onChange}
            >
              {roles?.map((elem) => (
                <option key={elem} value={elem}>
                  {getRolesValue(lang)[elem]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
