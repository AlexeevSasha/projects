import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IProductCart } from "../../api/dto/IProductInfo";
import { ITicket } from "../../api/dto/ITickets";
import { shopRepository } from "../../api/shopRepository";
import { ticketsRepository } from "../../api/ticketsRepository";
import { getCookie } from "../../assets/constants/getCookie";
import { setFavouritsCookie } from "../../assets/helpers/setFavouritsCookie";
import { EnumCartTabs } from "../../common/interfaces/EnumDrawerTabs";

type ShopStateType = {
  drawerIsOpen?: boolean;
  activeTab?: EnumCartTabs;
  favourites?: string[];
  tickets?: ITicket[];
  excursion?: ITicket[];
  products?: IProductCart;
  card?: string | null;
};

type Props = {
  value?: ShopStateType;
};

const getIds = (res: { id: string }[]) => res.map(({ id }) => id);

export const useShop = ({ value }: Props) => {
  const { query } = useRouter();

  const [shop, setShopState] = useState<ShopStateType | undefined>(value);

  const setFavourites = (favourites?: string[]) => setShopState((state) => ({ ...state, favourites }));

  const setDrawerIsOpen = (drawerIsOpen?: boolean, activeTab?: EnumCartTabs) =>
    setShopState((store) => ({ ...store, drawerIsOpen, activeTab }));

  const setListShop = (products: IProductCart) => setShopState((state) => ({ ...state, products }));

  const setListTicket = (tickets: ITicket[]) => setShopState((state) => ({ ...state, tickets }));

  const setListExcursion = (excursion: ITicket[]) => setShopState((state) => ({ ...state, excursion }));

  const setCardTicket = (card?: string | null) => setShopState((state) => ({ ...state, card }));

  const updateFavourites = (id: string) => {
    const stateHasFavorite = shop?.favourites?.some((Id: string) => Id === id);
    const favourits = stateHasFavorite
      ? shop?.favourites?.filter((Id: string) => Id !== id)
      : [...(shop?.favourites || []), id];

    if (getCookie("access_token")) shopRepository[stateHasFavorite ? "deleteFavourite" : "addFavourite"]([id]);
    else setFavouritsCookie(favourits);

    setFavourites(favourits);
  };

  const updateShopData = () => {
    if (((query.backUrl && query.backUrl.toString()) || "/").startsWith("http")) return;

    shopRepository.fetchShopBasket().then(setListShop);
    ticketsRepository.fetchCartTickets().then((res) => {
      setListTicket(res?.list);
      setCardTicket(res?.card);
    });
    ticketsRepository.fetchCartTickets("excursion").then((res) => {
      setListExcursion(res?.list);
    });

    if (getCookie("access_token")) shopRepository.fetchFavourites().then((res) => setFavourites(getIds(res)));
    else setFavourites(JSON.parse(getCookie("favourites") || "[]"));
  };

  useEffect(() => {
    updateShopData();
  }, []);

  return {
    shop,
    setFavourites,
    updateFavourites,
    updateShopData,
    setListShop,
    setListTicket,
    setDrawerIsOpen,
    setCardTicket,
    setListExcursion,
  };
};
