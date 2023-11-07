import { createColumnHelper } from "@tanstack/react-table";
import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";
import { DeletePartnerInvoice } from "../components/deletePartnerInvoice";
import { deleteInvoiceById } from "../../../api/invoice";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<InvoiceInfoT>();

export const allPartnerTableColumns = (lang: LanguageT, onDelete: (id: string) => void) => {
  return [
    columnHelper.accessor("user.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{lang.table.name}</span>,
    }),
    columnHelper.accessor("user.email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{lang.table.email}</span>,
    }),
    columnHelper.accessor("balance", {
      cell: (info) => <span>{info.getValue() || 0} ₽</span>,
      header: () => <span>{lang.table.balance} </span>,
    }),
    columnHelper.accessor("underReview", {
      cell: (info) => <span>{info.getValue() || 0} ₽</span>,
      header: () => <span>{lang.table.requested} </span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <div className={"flex justify-center gap-3 "}>
          <DeletePartnerInvoice
            user={info.row.original.user}
            onDelete={() => deleteInvoiceById(info.getValue(), onDelete)}
          />
        </div>
      ),
      header: () => <div className={"text-center"}>{lang.table.actions}</div>,
    }),
  ];
};
