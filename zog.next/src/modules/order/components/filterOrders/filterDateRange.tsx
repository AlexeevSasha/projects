import { Modal } from "../../../../common/components/modal/modal";
import { DateRange } from "../../../../common/components/dateRange";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { IOrderSearchParams } from "../../interfaces/FilterT";
import { OrderFilterContext } from "../../constants/context";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

export const FilterDateRange = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [showDate, setShowDate] = useState(false);
  const { filterData, setFilterData } = useContext(OrderFilterContext);
  const [newDate, setNewDate] = useState<Pick<IOrderSearchParams, "startDate" | "endDate">>({
    startDate: null,
    endDate: null,
  });

  const onChange = (startDate: Date, endDate: Date) => {
    setNewDate({ startDate, endDate });
  };

  const onSuccessClick = () => {
    setFilterData((prev) => ({ ...prev, startDate: newDate.startDate, endDate: newDate.endDate }));
    setShowDate(false);
  };

  const clearRange = () => {
    setFilterData((prev) => ({ ...prev, startDate: null, endDate: null }));
    setNewDate({ startDate: null, endDate: null });
  };

  return (
    <div>
      {filterData.startDate && filterData.endDate ? (
        <div className={"flex items-center gap-1"}>
          <div
            onClick={() => setShowDate(true)}
            className={
              "flex cursor-pointer items-center rounded-lg border border-blue-400 bg-white pt-2 pb-2"
            }
          >
            <span className={"pl-2 pr-1 "}>{format(filterData.startDate, "dd.MM.yyyy")}</span>-
            <span className={"pr-2 pl-1 "}>{format(filterData.endDate, "dd.MM.yyyy")}</span>
          </div>
          <button
            onClick={clearRange}
            className={"h-4 w-4 text-red-600 transition-colors hover:text-red-900"}
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowDate(true)}
          className={"w-50 block whitespace-nowrap rounded-md bg-blue-500 p-2 text-white"}
        >
          {lang.common.select_period}
        </button>
      )}
      {showDate && (
        <Modal
          title={lang.common.select_date}
          content={
            <div className={"p-4"}>
              <DateRange
                endDate={filterData.endDate}
                startDate={filterData.startDate}
                onChange={onChange}
              />
              <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
                <button
                  className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                  type="button"
                  onClick={() => setShowDate(false)}
                >
                  {lang.common.cancel}
                </button>
                <button
                  onClick={onSuccessClick}
                  className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                  type="submit"
                >
                  {lang.common.apply_filter}
                </button>
              </div>
            </div>
          }
          outsideClick={() => setShowDate(false)}
        />
      )}
    </div>
  );
};
