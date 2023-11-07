import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "../../../common/constants/formatDate";
import { PaymentOrderT } from "../interfaces/PaymentOrderT";
import { StatusPaymentOrder, StatusPaymentOrderLang } from "../interfaces/StatusPaymentOrder";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<PaymentOrderT>();

export const partnerPaymentTableColumns = (
  lang: LanguageT,
  confirmOrder: (paymentOrder: PaymentOrderT) => void,
  cancelOrder: (paymentOrder: PaymentOrderT) => void
) => [
  columnHelper.accessor("bankName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{lang.table.bank_name}</span>,
  }),
  columnHelper.accessor("count", {
    cell: (info) => String(info.getValue()) + " ₽",
    header: () => <span>{lang.table.sum}</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => formatDate(info.getValue(), "dd/MM/yyyy"),
    header: () => <span>{lang.table.date_creation}</span>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <select
        value={info.getValue().toString()}
        id="countries"
        className="min-w-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(value) =>
          value.currentTarget.value === StatusPaymentOrder.ApprovedPartner
            ? confirmOrder(info.row.original)
            : value.currentTarget.value === StatusPaymentOrder.Cancel
            ? cancelOrder(info.row.original)
            : undefined
        }
      >
        <option disabled value={StatusPaymentOrder.Created}>
          {StatusPaymentOrderLang(lang).Created}
        </option>
        <option value={StatusPaymentOrder.ApprovedAdmin} disabled>
          {StatusPaymentOrderLang(lang).ApprovedAdmin}
        </option>
        <option
          disabled={info.getValue() !== StatusPaymentOrder.ApprovedAdmin}
          value={StatusPaymentOrder.ApprovedPartner}
        >
          {StatusPaymentOrderLang(lang).ApprovedPartner}
        </option>
        <option
          disabled={info.getValue() !== StatusPaymentOrder.Created}
          value={StatusPaymentOrder.Cancel}
        >
          {StatusPaymentOrderLang(lang).Cancel}
        </option>
      </select>
    ),
    header: () => <span>{lang.table.status_application}</span>,
  }),
];
