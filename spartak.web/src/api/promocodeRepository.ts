import { BaseApiService } from "./BaseApiService";
import { parseJwt } from "../assets/constants/parseJwt";
import { getCookie } from "../assets/constants/getCookie";

interface IPromo {
  error: number;
  isPromoEnabled: boolean;
  promoCode?: string | null;
}

class PromocodeRepository extends BaseApiService {
  constructor(url: string) {
    super(url);
    this.url = url;
  }

  contactId = () => {
    const access_token = typeof window !== "undefined" ? getCookie("access_token") : undefined;
    return access_token && parseJwt(access_token)?.hash;
  };

  fetchPromoDismiss = () =>
    this.fetchShopAndTickets(
      "promo-dismiss",
      { error: -1, isPromoEnabled: false },
      { method: "GET", credentials: "include" }
    );

  fetchGetPromo = (access_token?: string) => {
    const link = access_token
      ? `promo/?hash=${parseJwt(access_token)?.hash}`
      : this.contactId()
      ? `promo/?hash=${this.contactId()}`
      : "promo";

    return this.fetchShopAndTickets<IPromo>(
      link,
      { error: -1, isPromoEnabled: false }, // default value
      { method: "GET", credentials: "include" }
    );
  };

  fetchAddPromo = (code: string) => {
    const dataRequest = "code=" + encodeURIComponent(code) + "&hash=" + encodeURIComponent(this.contactId());

    return this.fetchShopAndTickets<IPromo>(
      "promo/",
      { error: -1, isPromoEnabled: false },
      {
        method: "POST",
        body: dataRequest,
        headers: { "Content-type": " application/x-www-form-urlencoded; charset=UTF-8" },
        credentials: "include",
      }
    );
  };
}

export const promocodeRepository = new PromocodeRepository(`${process.env.NEXT_PUBLIC_TICKETS_URL}/`);
