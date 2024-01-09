import { getCookie } from "../assets/constants/getCookie";
import { parseJwt } from "../assets/constants/parseJwt";
import { BaseFilters } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IOrderDetails, IOrders } from "./dto/IOrders";
import { IProduct, IProductCategory, IProductSearchResult } from "./dto/IProduct";
import { IProductCart } from "./dto/IProductInfo";

interface IShopProductListFilter extends BaseFilters {
  locale?: string;
}

class ShopRepository extends BaseApiService {
  constructor(url: string) {
    super(url);
    this.url = url;
  }

  basketId = () => getCookie("basketId");

  contactId = () => {
    const access_token = typeof window !== "undefined" ? getCookie("access_token") : undefined;
    return access_token && parseJwt(access_token)?.sub;
  };

  sessionId = () => {
    const access_token = typeof window !== "undefined" ? getCookie("access_token") : undefined;
    return access_token && parseJwt(access_token)?.session_id;
  };

  fetchShopCategories = (locale: string) =>
    this.fetchShopAndTickets<IProductCategory[]>(`menuFooter/?lang=${locale}`, [], { method: "GET" });

  fetchShopProductList = (filter: IShopProductListFilter = {}) =>
    this.fetchShopAndTickets<IProduct[]>(`productNew/?lang=${filter.locale}`, [], { method: "GET" });

  fetchDenariiProductList = (filter: IShopProductListFilter = {}) =>
    this.fetchShopAndTickets<IProduct[]>(`productDenarii/?lang=${filter.locale}`, [], { method: "GET" });

  fetchSearchFullProducts = (query: string) =>
    this.fetchShopAndTickets<IProduct[]>(`search/full/?q=${query}`, [], { method: "GET" });

  fetchSearchFullProductsWihPagination = (query: string, page: number, pagelimit: number) =>
    this.fetchShopAndTickets<IProductSearchResult>(
      `search/fullpagination/?q=${query}&page=${page}&pagelimit=${pagelimit}`,
      [],
      {
        method: "GET",
      }
    );

  fetchShopProductShortList = (ids: string[]) => {
    return this.fetchShopAndTickets<IProduct[]>(`productShort/?${ids.map((id) => `id[]=${id}`).join("&")}`, []);
  };

  fetchShopBasket = () =>
    this.fetchShopAndTickets<IProductCart>(
      `basket/?${this.queryParams({
        basketId: this.basketId(),
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`,
      [],
      { method: "GET" }
    );

  addBasketProduct = (id: number) => this.basketOperations(id, "add");

  deleteBasketProduct = (id: number) => this.basketOperations(id, "delete");

  updateBasketProduct = (id: number, quantity: number) => this.basketOperations(id, "update", quantity);

  clearAllBasket = () => {
    return this.fetchShopAndTickets<{ success: string; status: string }>(
      `basket/clear/?${this.queryParams({
        basketId: this.basketId(),
        contactId: this.contactId(),
        sessionId: this.sessionId(),
        quantity: 1,
      })}`,
      [],
      { method: "GET" }
    );
  };

  fetchOrderList = (page: number) =>
    this.fetchShopAndTickets<IOrders>(
      `lk/order/?${this.queryParams({
        page,
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`,
      { list: [] }
    );

  fetchOrderHistoryList = (page: number) =>
    this.fetchShopAndTickets<IOrders>(
      `lk/orderHistory/?${this.queryParams({
        page,
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`,
      { list: [] }
    );

  fetchOrderDetail = (id: string) =>
    this.fetchShopAndTickets<IOrderDetails>(
      `lk/order/${id}/?${this.queryParams({
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`
    );

  deleteOrder = (id: string) =>
    this.fetchShopAndTickets(
      `lk/order/cancel/${id}/?${this.queryParams({
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`
    );

  fetchFavourites = () =>
    this.fetchShopAndTickets<IProduct[]>(
      `lk/favourites/?${this.queryParams({
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}`,
      []
    );

  addFavourite = (productIds: string[]) => this.favouritesOperations(productIds, "add");

  deleteFavourite = (productIds: string[]) => this.favouritesOperations(productIds, "delete");

  dataBindingDuringAuth = (basketId: string, productIds: string[]) =>
    this.fetchShopAndTickets<IProduct[]>(
      `lk/auth/?${this.queryParams({
        contactId: this.contactId(),
        sessionId: this.sessionId(),
        basketId: basketId,
      })}${productIds.length ? `&favouritesID[]=${productIds.join("&favouritesID[]=")}` : ""}`,
      []
    );
  protected favouritesOperations = (productIds: string[], partPath: string) =>
    this.fetchShopAndTickets(
      `lk/favourites/${partPath}/?${this.queryParams({
        contactId: this.contactId(),
        sessionId: this.sessionId(),
      })}${productIds.length ? `&productId=${productIds.join("&productId=")}` : ""}`
    );

  protected basketOperations = (id: number, partPath: string, quantity?: number) => {
    return this.fetchShopAndTickets<{ basketId: number }>(
      `basket/${partPath}/?${this.queryParams({
        basketId: this.basketId(),
        contactId: this.contactId(),
        sessionId: this.sessionId(),
        id,
        quantity: quantity || 1,
      })}`,
      [],
      { method: "GET" }
    );
  };
}

export const shopRepository = new ShopRepository(`${process.env.NEXT_PUBLIC_SHOP_URL_BACK}/local/api/`);
