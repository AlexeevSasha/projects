import { Session } from "next-auth";
import { Prisma } from "@prisma/client";
import { paginatePageSize } from "../../common/constants/paginatePageSize";
import { IOrderSearchParams } from "../../modules/order/interfaces/FilterT";

export const getOrderAfterPayOption = (user: Session["user"] | null) => {
  const options: Prisma.OrderAfterPayFindManyArgs = {
    orderBy: { createdAt: "desc" },
    skip: 0,
    take: paginatePageSize,
  };

  if (user?.userRole === "Consultant") {
    options.where = {
      consultant: user?.id,
    };
  } else if (user?.userRole === "Client") {
    options.where = {
      email: {
        contains: user?.email || "",
        mode: "insensitive",
      },
    };
  } else if (user?.userRole === "Partner") {
    options.where = {
      utm_partner: user?.utm_partner,
    };
  }

  return options;
};

export const postOrderAfterPayOption = (
  user: Session["user"] | null,
  page: number,
  params: IOrderSearchParams
) => {
  const options: Prisma.OrderAfterPayFindManyArgs = {
    orderBy: { createdAt: "desc" },
    skip: page > 1 ? (page - 1) * paginatePageSize : 0,
    take: paginatePageSize,
  };

  if (user?.userRole === "Consultant") {
    options.where = {
      AND: [
        { consultant: user?.id },
        {
          OR: [
            { email: { contains: params.searchText, mode: "insensitive" } },
            { name: { contains: params.searchText, mode: "insensitive" } },
          ],
        },
        { stage: { contains: params.status } },
      ],
    };
  } else if (user?.userRole === "Client") {
    options.where = {
      AND: [{ email: user?.email }, { stage: { contains: params.status } }],
    };
  } else if (user?.userRole === "Admin") {
    options.where = {
      AND: [
        {
          OR: [
            { email: { contains: params.searchText, mode: "insensitive" } },
            { name: { contains: params.searchText, mode: "insensitive" } },
          ],
        },
        { stage: { contains: params.status } },
        getWhereFields(params),
      ],
    };
  }

  return options;
};

function getWhereFields(params: IOrderSearchParams) {
  const rangeDate =
    params.endDate && params.startDate
      ? { createdAt: { lte: params.endDate, gte: params.startDate } }
      : {};
  const consultantId = params.consultId ? { consultant: { contains: params.consultId } } : {};

  return { ...rangeDate, ...consultantId };
}
