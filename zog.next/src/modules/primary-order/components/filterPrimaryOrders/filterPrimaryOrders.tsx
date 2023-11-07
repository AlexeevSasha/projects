import { useSession } from "next-auth/react";
import { KeyboardEvent, useContext, useState } from "react";
import { PrimaryOrderFilterContext } from "../../constants/context";
import { StatusPrimaryOrder } from "../../interfaces/StatusPrimaryOrder";
import { FilterPrimaryOrderByPeriod } from "./filterPrimaryOrderByPeriod";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

export const FilterPrimaryOrders = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).table;
  const { data } = useSession();
  const { filterData, setFilterData } = useContext(PrimaryOrderFilterContext);
  const [text, setText] = useState(filterData.searchText);

  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilterData((prev) => ({ ...prev, searchText: text }));
    }
  };

  return (
    <div className="grid grid-cols-2">
      {data?.user?.userRole === "Admin" ? (
        <div>
          <h1 className="">{lang.find_application}:</h1>

          <input
            value={text}
            className="rounded-l-lg py-1 px-2"
            placeholder={lang.enter_email_or_name}
            onKeyDown={keyDown}
            onChange={(event) => setText(event.currentTarget.value)}
          />
          <button
            className="rounded-r-lg bg-blue-500 py-1  px-2 text-white"
            onClick={() => setFilterData((prev) => ({ ...prev, searchText: text }))}
          >
            {lang.find}
          </button>
        </div>
      ) : null}
      <div>
        <div>
          <h1 className="">{lang.filter_application_by_status}</h1>

          <select
            defaultValue={""}
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(value) => {
              setFilterData((prev) => ({ ...prev, status: value.target.value }));
            }}
          >
            <option value=""></option>
            {Object.entries(StatusPrimaryOrder).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <FilterPrimaryOrderByPeriod />
      </div>
    </div>
  );
};
