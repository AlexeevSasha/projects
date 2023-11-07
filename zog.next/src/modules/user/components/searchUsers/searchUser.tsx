import { KeyboardEvent, memo, useState } from "react";
import { userRoles } from "../../../../common/constants/userRoles";
import { getRolesValue } from "../../constants/getRolesValue";
import { UserRoleT } from "../../interfaces/UserRoleT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  onSearch: (value: string, role: UserRoleT | "") => void;
}

export const SearchUser = memo(({ onSearch }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [search, setSearch] = useState("");
  const [role, setRoles] = useState<UserRoleT | "">("");
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(search, role);
    }
  };
  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="">{lang.table.find_user}:</h1>

        <input
          className="rounded-l-lg py-1 px-2"
          placeholder={lang.table.enter_email_or_name}
          onKeyDown={keyDown}
          onChange={(event) => setSearch(event.currentTarget.value.trim())}
        />
        <button
          className="rounded-r-lg bg-blue-500 py-1  px-2 text-white"
          onClick={() => onSearch(search, role)}
        >
          {lang.table.find}
        </button>
      </div>
      <div>
        <h1 className="">{lang.table.filter_role}:</h1>

        <select
          value={role}
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(value) => {
            onSearch(search, value.target.value as UserRoleT);
            setRoles(value.target.value as UserRoleT);
          }}
        >
          <option value=""></option>
          {userRoles?.map((elem) => (
            <option key={elem} value={elem}>
              {getRolesValue(lang)[elem]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
