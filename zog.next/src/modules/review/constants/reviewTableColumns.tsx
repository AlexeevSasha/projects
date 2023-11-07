import { createColumnHelper } from "@tanstack/react-table";
import { IReview } from "../interfaces/Review";
import { nameConsultListsEnum } from "./nameLists";
import Link from "next/link";
import { formatDate } from "../../../common/constants/formatDate";
import { LanguageT } from "../../../common/interfaces/LanguageT";
import { UserT } from "../../user/interfaces/UserT";
import { DeleteOrder } from "../../order/components/deleteOrder";
import { deleteReviewById } from "../../../api/review";

const columnHelper = createColumnHelper<IReview>();

export const reviewTableColumns = (
  lang: LanguageT,
  user: UserT | null,
  handlerDelete: (id: string) => void
) => {
  const columns = [
    columnHelper.accessor("fullName", {
      cell: (info) => (
        <Link className={" hover:text-blue-600"} href={`/lk/review/${info.row.original.id}`}>
          {info.getValue()}
        </Link>
      ),
      header: () => <span>{lang.review.full_name}</span>,
    }),
    columnHelper.accessor("nameConsult", {
      cell: (info) => nameConsultListsEnum[info.getValue() as keyof typeof nameConsultListsEnum],
      header: () => <span>{lang.review.who_did_you_consult}</span>,
    }),
    columnHelper.accessor("rating", {
      cell: (info) => info.getValue(),
      header: () => <span>{lang.review.assess_how_satisfied_you}</span>,
    }),
    columnHelper.accessor("agreement", {
      cell: (info) => (info.getValue() ? "Согласен(-на)" : "Не согласен(-на)"),
      header: () => <span>{lang.review.consent_to_publication}</span>,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => formatDate(info.getValue(), "dd.MM.yyyy"),
      header: () => <span>{lang.review.date}</span>,
    }),
  ];

  const onlyForAdminColumn =
    user?.userRole === "Admin"
      ? [
          columnHelper.accessor("id", {
            cell: (info) => (
              <div className={"flex justify-center gap-4 "}>
                <DeleteOrder onDelete={() => deleteReviewById(info.getValue(), handlerDelete)} />
              </div>
            ),
            header: () => <div className={"text-center"}>{lang.table.actions}</div>,
          }),
        ]
      : [];

  return [...columns, ...onlyForAdminColumn];
};
