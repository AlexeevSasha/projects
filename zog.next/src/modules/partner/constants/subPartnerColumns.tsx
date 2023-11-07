import { createColumnHelper } from "@tanstack/react-table";
import { PaysSubPartnerT } from "../../user/interfaces/PaysSubPartnerT";
import { formatDate } from "../../../common/constants/formatDate";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<PaysSubPartnerT>();

export const subPartnerColumns = (lang: LanguageT) => [
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{lang.table.name}</span>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{lang.table.email}</span>,
  }),
  columnHelper.accessor("date", {
    cell: (info) => <span>{formatDate(info.getValue(), "dd/MM/yyyy")}</span>,
    header: () => <span>{lang.table.date}</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>{info.getValue() + " ₽"}</span>,
    header: () => <span>{lang.table.price}</span>,
  }),
];
