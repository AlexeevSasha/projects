import { BaseApiService } from "./BaseApiService";
import type { DeleteCartTicketsDto, ICreateOrderTickets, ITickets } from "./dto/ITickets";
import { ProfileTicket } from "./dto/TicketDto";

type TicktsFilter = {
  [key: string]: any;
};

class TicketsRepository extends BaseApiService {
  constructor(url: string) {
    super(url);
    this.url = url;
  }

  fetchOrdersTickets = (filter: TicktsFilter = {}) =>
    this.get<{ Items: ProfileTicket[]; Count: number }>(
      `${process.env.NEXT_PUBLIC_BACK_URL}/match/ContactOrder/GetOrders?${this.getFilters(filter)}`,
      { status: 400 }
    );

  deleteTicket = (orderId: number, companyId: number) =>
    this.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/match/ContactOrder/CancelOrder`,
      JSON.stringify({ OrderId: orderId, CompanyId: companyId })
    );

  sendOnMail = (orderId: number, companyId: number) =>
    this.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/match/ContactOrder/SendOrderToEmail`,
      JSON.stringify({ OrderId: orderId, CompanyId: companyId })
    );

  fetchCartTickets = (type?: string) =>
    //Promise.resolve({ list: [], card: null });
    this.fetchShopAndTickets<ITickets>(
      `${type === "excursion" ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL}/cart/0`,
      {},
      {
        method: "GET",
        credentials: "include",
      }
    );

  deleteCartTickets = (id: string, body?: DeleteCartTicketsDto, type?: string) => {
    const formData = new FormData();
    formData.append("operation", "remove");
    body &&
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

    return this.fetchShopAndTickets<ITickets>(
      `${type === "excursion" ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL}/cart/${id}`,
      { list: [] },
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
  };

  changeCategoryCartTicket = (type: string, body?: { id: string; categoryId?: string; quant?: string }) => {
    const formData = new FormData();
    formData.append("operation", "modify");
    body &&
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

    return this.fetchShopAndTickets<ITickets>(
      `${process.env.NEXT_PUBLIC_TICKETS_URL}/cart/${type}`,
      { list: [] },
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
  };

  changeCategoryCartExcursion = (itemId: string, body?: { id: string; quant?: string }) => {
    const formData = new FormData();
    formData.append("operation", "modify");
    body &&
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

    return this.fetchShopAndTickets<ITickets>(
      `${process.env.NEXT_PUBLIC_MUSEUM_URL}/cart/${itemId}`,
      { list: [] },
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
  };

  createOrder = (calendarId: string, card?: string | null, type?: string) => {
    const body: any = {
      cardNumber: card,
    };
    const formBody = Object.keys(body)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
      .join("&");

    return this.fetchShopAndTickets<ICreateOrderTickets>(
      `${
        type === "excursion" ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL
      }/create-order/${calendarId}`,
      {},
      {
        method: "POST",
        body: formBody,
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };
  // ---->
  createExcursionOrder = (calendarId: string, card?: string | null) => {
    const body: any = {
      cardNumber: card,
    };
    const formBody = Object.keys(body)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
      .join("&");

    return this.fetchShopAndExcursion<ICreateOrderTickets>(
      `${process.env.NEXT_PUBLIC_MUSEUM_URL}/create-order/${calendarId}`,
      {},
      {
        method: "POST",
        body: formBody,
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };

  checkTicketFanId = (type: string, body?: { id: string; fanId: string }) => {
    const formData = new FormData();
    formData.append("operation", "check");
    if (body) {
      formData.append("id", body.id);
      formData.append("fanId", body.fanId);
    }

    return this.fetchShopAndTickets<ITickets>(
      `${process.env.NEXT_PUBLIC_TICKETS_URL}/cart/${type}`,
      {},
      { method: "POST", credentials: "include", body: formData }
    );
  };

  getTicketPDF = (id: number, type: number) => {
    return fetch(
      `${type === 2 ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL}/download-order/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.blob();
        } else {
          throw new Error();
        }
      })
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `order-${id}.pdf`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };
}

export const ticketsRepository = new TicketsRepository("");
