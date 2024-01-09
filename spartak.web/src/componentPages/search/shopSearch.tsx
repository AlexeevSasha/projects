import { useRouter } from "next/router";
import { memo } from "react";
import { IProduct } from "../../api/dto/IProduct";
import { BlockOfShopSearchResult } from "./shopSearchResult/blockOfShopSearchResult";
import { TabOfShopSearchResult } from "./shopSearchResult/tabOfShopSearchResult";
interface IProps {
  products: IProduct[];
  count: number;
}

export const ShopSearch = memo((props: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfShopSearchResult products={props.products} />;
    }

    case "Shop": {
      return <TabOfShopSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
});
