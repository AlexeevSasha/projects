import { useContext, useEffect, useState } from "react";
import { FilterDateRange } from "./filterDateRange";
import { getConsultants } from "../../../../api/user";
import { UserT } from "../../../user/interfaces/UserT";
import { OrderFilterContext } from "../../constants/context";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

export const FilterByConsultant = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).table;
  const [consultantList, setConsultantList] = useState<UserT[]>([]);
  const { filterData, setFilterData } = useContext(OrderFilterContext);

  useEffect(() => {
    getConsultants(setConsultantList).then();
  }, []);

  return (
    <div className="mt-4">
      <h1>{lang.filter_cons_by_period}</h1>

      <div className={"flex gap-2"}>
        <select
          defaultValue={""}
          id="consultant"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(value) => {
            const check = !value.target.value;
            setFilterData((prev) => ({
              ...prev,
              startDate: check ? null : prev.startDate,
              endDate: check ? null : prev.endDate,
              consultId: value.target.value,
            }));
          }}
        >
          <option value=""></option>
          {consultantList.map((el) => (
            <option key={el.id} value={el.id}>{`${el.name ? el.name + " - " : ""}${
              el.email
            }`}</option>
          ))}
        </select>
        {filterData.consultId ? <FilterDateRange /> : null}
      </div>
    </div>
  );
};
