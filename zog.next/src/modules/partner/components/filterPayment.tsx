import { KeyboardEvent, memo, useEffect, useState } from "react";
import { StatusPaymentOrder, StatusPaymentOrderLang } from "../interfaces/StatusPaymentOrder";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  onSearch: (value: string, status: string) => void;
}

export const FilterPayment = memo(({ onSearch }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(search, status);
    }
  };

  useEffect(() => {
    onSearch(search, status);
  }, [status]);

  return (
    <div className="grid grid-cols-1 gap-y-8 xl:grid-cols-2">
      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          {lang.partner.filter_email}
        </h3>

        <input
          className="rounded-l-lg py-1 px-2"
          placeholder={lang.partner.enter_email}
          onKeyDown={keyDown}
          onChange={(event) => setSearch(event.currentTarget.value.trim())}
        />
        <button
          className="rounded-r-lg bg-blue-500 py-1  px-2 text-white"
          onClick={() => onSearch(search, status)}
        >
          {lang.partner.find}
        </button>
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          {lang.table.filter_by_status}
        </h3>
        <ul className="w-min items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
          <li className="w-min border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
            <div className="flex items-center px-3">
              <input
                id="all"
                type="radio"
                value=""
                onChange={(e) => setStatus(e.currentTarget.value)}
                name="list-radio"
                defaultChecked={true}
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="all"
                className="ml-2 w-min py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {lang.table.all}
              </label>
            </div>
          </li>

          <li className="w-min border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
            <div className="flex items-center px-3">
              <input
                id="created"
                type="radio"
                value={StatusPaymentOrder.Created}
                onChange={(e) => setStatus(e.currentTarget.value)}
                name="list-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="created"
                className="ml-2 w-min py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {StatusPaymentOrderLang(lang).Created}
              </label>
            </div>
          </li>

          <li className="w-min border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
            <div className="flex items-center px-3">
              <input
                id="ApprovedAdmin"
                type="radio"
                value={StatusPaymentOrder.ApprovedAdmin}
                onChange={(e) => setStatus(e.currentTarget.value)}
                name="list-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="ApprovedAdmin"
                className="ml-2 w-min py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {StatusPaymentOrderLang(lang).ApprovedAdmin}
              </label>
            </div>
          </li>

          <li className="w-min border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
            <div className="flex items-center px-3">
              <input
                id="ApprovedPartner"
                type="radio"
                value={StatusPaymentOrder.ApprovedPartner}
                onChange={(e) => setStatus(e.currentTarget.value)}
                name="list-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="ApprovedPartner"
                className="ml-2 w-min py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {StatusPaymentOrderLang(lang).ApprovedPartner}
              </label>
            </div>
          </li>
          <li className="w-min dark:border-gray-600">
            <div className="flex items-center px-3">
              <input
                id="Cancel"
                type="radio"
                value={StatusPaymentOrder.Cancel}
                onChange={(e) => setStatus(e.currentTarget.value)}
                name="list-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="Cancel"
                className="ml-2 w-min py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {StatusPaymentOrderLang(lang).Cancel}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
});
