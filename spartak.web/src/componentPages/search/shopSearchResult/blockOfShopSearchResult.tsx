import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { theme } from "../../../assets/theme/theme";
import { CardShop } from "../../../components/cardShop/cardShop";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { DataContext } from "../../../core/dataProvider";
import { ShowMore } from "./../ui";

interface IProps {
  products: SearchResult["Products"];
}

export const BlockOfShopSearchResult = memo(({ products }: IProps) => {
  const { locale = "ru", query } = useRouter();
  const { setLoading } = useContext(DataContext);

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList["shop/shop"]}>
        <CardContainer>
          {products?.map((elem) => (
            <CardShop key={elem.id} productInfo={elem} setLoading={setLoading} />
          ))}
        </CardContainer>
      </DropdownList>

      <Link prefetch={false} href={{ pathname: "/search", query: { ...query, tab: "Shop" } }} passHref>
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;
  grid-row-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 4.27vw;
    grid-row-gap: 4.27vw;
  }
`;
const CardContainer = styled(Container)`
  margin-top: -1.04vw;
`;
