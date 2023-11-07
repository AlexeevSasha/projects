import { useState } from "react";
import { ShortPaymentOrderT } from "../interfaces/PaymentOrderT";
import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  onSubmit: (value: ShortPaymentOrderT) => void;
  cancel: () => void;
  balance?: InvoiceInfoT["balance"];
  defaultValue: ShortPaymentOrderT;
}

export const FormCreatePayment = (props: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [data, setData] = useState<ShortPaymentOrderT>(props.defaultValue);
  const [error, setError] = useState(false);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (data.count > Number(props.balance || 0)) {
      setError(true);
    } else {
      props.onSubmit(data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6 p-6">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {lang.modal.payment_creation.names_bank}
          </label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            onChange={(event) => setData({ ...data, bankName: event.currentTarget.value })}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {lang.modal.payment_creation.card_number}
          </label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            onChange={(event) => setData({ ...data, cardNumber: event.currentTarget.value })}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {lang.modal.payment_creation.name_as_bank}
          </label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            onChange={(event) => setData({ ...data, name: event.currentTarget.value })}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {lang.modal.payment_creation.total_pay}
          </label>
          <input
            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
              error ? "border border-red-500 bg-red-50 text-red-900" : ""
            }`}
            required
            type="number"
            onChange={(event) => {
              setData({ ...data, count: Number(event.currentTarget.value) });
              setError(false);
            }}
          />
          {error ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {lang.modal.payment_creation.error_exceed_balance}
            </p>
          ) : null}
        </div>
      </div>
      {/* Футер */}
      <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {lang.common.send}
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
          onClick={props.cancel}
        >
          {lang.common.cancel}
        </button>
      </div>
    </form>
  );
};
