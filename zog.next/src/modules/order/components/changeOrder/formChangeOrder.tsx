import { OrderT } from "../../interfaces/OrderT";
import { FormEvent } from "react";
import { formatDate } from "../../../../common/constants/formatDate";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  order: OrderT;
  setOrder: (cb: (value: OrderT) => OrderT) => void;
  onSubmit: (event: FormEvent) => void;
  onClose: () => void;
}

export const FormChangeOrder = ({ order, onSubmit, setOrder, onClose }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <form onSubmit={onSubmit} className="relative flex-auto p-6">
      <div className={"mb-5"}>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          {lang.modal.application.start_support_date}
        </label>
        <input
          value={order?.supportDate ? formatDate(order?.supportDate, "yyyy-MM-dd") : ""}
          type={"date"}
          className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(event) => {
            setOrder((prev) => ({
              ...prev,
              supportDate: event.target.value ? new Date(event.target.value).toISOString() : null,
            }));
          }}
        />
      </div>
      <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
        <button
          className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
          onClick={onClose}
        >
          {lang.common.cancel}
        </button>
        <button
          className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
          type="submit"
        >
          {lang.common.change}
        </button>
      </div>
    </form>
  );
};
