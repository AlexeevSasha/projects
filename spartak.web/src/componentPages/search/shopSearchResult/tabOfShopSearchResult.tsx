import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IProduct } from "../../../api/dto/IProduct";
import { shopRepository } from "../../../api/shopRepository";
import { theme } from "../../../assets/theme/theme";
import { MoreButton } from "../../../components/buttons/moreButton";
import { CardShop } from "../../../components/cardShop/cardShop";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
interface IProps {
  products: IProduct[];
  count: number;
}

export const TabOfShopSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [list, setList] = useState<IProduct[]>(props.products);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    shopRepository
      .fetchSearchFullProductsWihPagination(`${query.search}`, newPage, 8)
      .then((result) => {
        setList([...list, ...(result.list || [])]);
      })
      .finally(() => {
        setLoading(false);
        setPage(newPage);
      });
  };

  return (
    <>
      <Container>
        {list?.map((elem) => (
          <CardShop key={elem.id} productInfo={elem} setLoading={setLoading} />
        ))}
      </Container>

      <Spacer height={["2.08vw", "3.13vw", "4.27vw"]} />
      {props.count > page * 8 ? (
        <MoreButton type="opacity" onClick={onSearch(page + 1)}>
          {lang[locale].button.loadMore}
        </MoreButton>
      ) : null}

      <Spacer height={["2.08vw", "5.21vw", "0.53vw"]} />
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
