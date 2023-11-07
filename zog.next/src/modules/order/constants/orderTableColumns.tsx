import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { OrderT } from "../interfaces/OrderT";
import { getSupportDate } from "./getSupportDate";
import { OrderType } from "./typeEnum";
import { sendEmail, sentEmailSignIn } from "../../../api/email";
import { DeleteOrder } from "../components/deleteOrder";
import { ChangeOrder } from "../components/changeOrder/changeOrder";
import { deleteOrderById, updateOrder } from "../../../api/order";
import { SendEmailEnum } from "../../../common/interfaces/SendEmail";
import { LanguageT } from "../../../common/interfaces/LanguageT";
import { AudioComment } from "../../../common/components/audioComment/audioComment";
import { UserT } from "../../user/interfaces/UserT";

const columnHelper = createColumnHelper<OrderT>();

export const StatusEnum: { [key: string]: string } = {
  pay: "Оплачен",
  new: "Начат",
  test: "Протестирован",
  consultant: "Передан консультанту",
  startConsultant: "Консультация назначена",
  finish: "Консультация проведена",
};

export const orderTableColumns = (
  lang: LanguageT,
  user: UserT | null,
  handlerDelete: (id: string) => void,
  updateClientList: (order: OrderT) => void
) => {
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <Link href={`/lk/clients/${info.row.original.id}`}>{info.getValue()}</Link>,
      header: () => <span>{lang.table.name}</span>,
    }),
    columnHelper.accessor("birthdate", {
      cell: (info) => String(info.getValue()).split("T")[0],
      header: () => <span>{lang.table.birthday}</span>,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: () => <span>{lang.table.phone}</span>,
    }),

    columnHelper.accessor("supportDate", {
      cell: (info) => {
        return info?.getValue() ? getSupportDate(info.getValue()) : "";
      },
      header: () => <span>{lang.table.support}</span>,
    }),
    columnHelper.accessor("stage", {
      cell: (info) =>
        user?.userRole === "Client" ? (
          <span>{StatusEnum[info.getValue()]}</span>
        ) : (
          <select
            defaultValue={info.getValue()}
            id={`order-${info.row.original.id}`}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(value) => {
              if (value.target.value === "finish") {
                sendEmail(info.row.original.email, SendEmailEnum.CONSULTATION_CONDUCTED, {
                  name: info.row.original.name,
                });
              }
              if (value.target.value === "test") {
                sentEmailSignIn(info.row.original.email, info.row.original.name);
              }

              axios.post("/api/clients/changeStatus", {
                id: info.row.original.id,
                stage: value.target.value,
              });
            }}
          >
            {user?.userRole === "Consultant" ? (
              <>
                {Object.entries(StatusEnum)
                  .filter(([key]) => ["consultant", "startConsultant", "finish"].includes(key))
                  .map(([key, value]) => (
                    <option selected={key === info.getValue()} key={key} value={key}>
                      {value}
                    </option>
                  ))}
              </>
            ) : (
              <>
                {Object.entries(StatusEnum).map(([key, value]) => (
                  <option selected={key === info.getValue()} key={key} value={key}>
                    {value}
                  </option>
                ))}
              </>
            )}
          </select>
        ),
      header: () => <span>{lang.table.status_application}</span>,
    }),
  ];

  const onlyForAdminColumn =
    user?.userRole === "Admin"
      ? [
          columnHelper.accessor("type", {
            cell: (info) => (
              <select
                defaultValue={info.getValue()}
                id="type_proposal"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(value) => {
                  updateOrder(info.row.original.id, { type: value.target.value }).then();
                }}
              >
                {Object.entries(OrderType).map(([key, value]) => (
                  <option selected={key === info.getValue()} key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            ),
            header: () => <span>{lang.table.type_application}</span>,
          }),
          columnHelper.accessor("id", {
            cell: (info) => (
              <div className={"flex justify-center gap-4 "}>
                <AudioComment id={info.getValue()} currentAudio={info.row.original.audio_comment} />
                <ChangeOrder updateClientList={updateClientList} order={info.row.original} />
                <DeleteOrder onDelete={() => deleteOrderById(info.getValue(), handlerDelete)} />
              </div>
            ),
            header: () => <div className={"text-center"}>{lang.table.actions}</div>,
          }),
        ]
      : [];

  return [...columns, ...onlyForAdminColumn];
};
