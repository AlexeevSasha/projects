import { createColumnHelper } from "@tanstack/react-table";
import { ShortOrderT } from "../../order/interfaces/OrderT";
import { StatusEnum } from "../../order/constants/orderTableColumns";
import { formatDate } from "../../../common/constants/formatDate";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<ShortOrderT>();

export const partnerOrdersTableColumns = (lang: LanguageT) => [
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{lang.table.name}</span>,
  }),
  columnHelper.accessor("location", {
    cell: (info) => String(info.getValue()),
    header: () => <span>{lang.table.city}</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => formatDate(info.getValue(), "dd/MM/yyyy"),
    header: () => <span>{lang.table.date_creation}</span>,
  }),
  columnHelper.accessor("stage", {
    cell: (info) => StatusEnum[`${info.getValue()?.toString()}`],
    header: () => <span>{lang.table.status_application}</span>,
  }),
];
