import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { IPrimaryOrder } from "../interfaces/PrimaryOrder";
import { PrimaryOrder } from "../components/PrimaryOrder";
import { changePrimaryOrder, deletePrimaryOrderById } from "../../../api/primary-order";
import { formatDate } from "../../../common/constants/formatDate";
import { UserT } from "../../user/interfaces/UserT";
import { StatusPrimaryOrder } from "../interfaces/StatusPrimaryOrder";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<IPrimaryOrder>();

export const primaryOrderTableColumns = (
  lang: LanguageT,
  user: UserT | null,
  handlerDelete: (id: string) => void,
  onChangePrimaryOrder: (order: IPrimaryOrder) => void
) => {
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <Link className={" hover:text-blue-600"} href={`/lk/primary-order/${info.row.original.id}`}>
          {info.getValue()}
        </Link>
      ),
      header: () => <span>{lang.table.name}</span>,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{lang.table.phone}</span>,
    }),
    columnHelper.accessor("messenger", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{lang.table.communication_method}</span>,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => <span>{formatDate(info.getValue(), "dd.MM.yyyy")}</span>,
      header: () => <span>{lang.table.date}</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) =>
        user?.userRole === "Client" ? (
          <span>{StatusPrimaryOrder[info.getValue() as keyof typeof StatusPrimaryOrder]}</span>
        ) : (
          <select
            id={`status_order_${info.row.original.id}`}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(e) =>
              changePrimaryOrder({ id: info.row.original.id, status: e.target.value })
            }
          >
            {Object.entries(StatusPrimaryOrder).map(([key, value]) => (
              <option selected={key === info.getValue()} key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        ),
      header: () => <span>{lang.table.status}</span>,
    }),
  ];

  const onlyForAdminColumn =
    user?.userRole === "Admin"
      ? [
          columnHelper.accessor("utm", {
            cell: (info) => (
              <div className={"flex justify-center gap-3 "}>
                <PrimaryOrder.GeneratePayPrimaryOrder
                  utm={info.getValue()}
                  form={info.row.original.form}
                  name={info.row.original.name}
                />
              </div>
            ),
            header: () => <div className={"text-center"}>{lang.table.payment_link}</div>,
          }),
          columnHelper.accessor("comment", {
            cell: (info) => (
              <div className={"flex justify-center gap-3 "}>
                <PrimaryOrder.CommentPrimaryOrder
                  onChangePrimaryOrder={onChangePrimaryOrder}
                  id={info.row.original.id}
                  role={user.userRole}
                  comment={info.getValue()}
                />
              </div>
            ),
            header: () => <div className={"text-center"}>{lang.table.comment}</div>,
          }),
          columnHelper.accessor("id", {
            cell: (info) => (
              <div className={"flex justify-center gap-3 "}>
                <PrimaryOrder.DeletePrimaryOrder
                  onDelete={() => deletePrimaryOrderById(info.row.original.id, handlerDelete)}
                ></PrimaryOrder.DeletePrimaryOrder>
              </div>
            ),
            header: () => <div className={"text-center"}>{lang.table.actions}</div>,
          }),
        ]
      : [];

  return [...columns, ...onlyForAdminColumn];
};
