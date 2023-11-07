import { useSession } from "next-auth/react";
import { KeyboardEvent, useContext, useState } from "react";
import { StatusEnum } from "../../constants/orderTableColumns";
import { OrderFilterContext } from "../../constants/context";
import { FilterByConsultant } from "./filterByConsultant";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

export const FilterOrders = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).table;
  const { data } = useSession();
  const { filterData, setFilterData } = useContext(OrderFilterContext);
  const [text, setText] = useState(filterData.searchText);

  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilterData((prev) => ({ ...prev, searchText: text }));
    }
  };

  return (
    <div className="flex justify-between">
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
          <h1 className="">{lang.filter_application_by_status}:</h1>
          <select
            defaultValue={""}
            id="countries"
            className="block w-full max-w-lg rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(value) => {
              setFilterData((prev) => ({ ...prev, status: value.target.value }));
            }}
          >
            <option value=""></option>
            <option value="pay">{StatusEnum["pay"]}</option>
            <option value="new">{StatusEnum["new"]}</option>
            <option value="test">{StatusEnum["test"]}</option>
            <option value="consultant">{StatusEnum["consultant"]}</option>
            <option value="startConsultant">{StatusEnum["startConsultant"]}</option>
            <option value="finish">{StatusEnum["finish"]}</option>
          </select>
        </div>
        {data?.user?.userRole === "Admin" ? <FilterByConsultant /> : null}
      </div>
    </div>
  );
};
