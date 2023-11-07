import { Container } from "common/components/Container";
import { GetServerSideProps } from "next";
import { Breadcrumbs } from "../common/components/Breadcrumbs";
import { TitleH1 } from "../common/components/TitleH1";
import styled from "astroturf/react";
import { InputStyle } from "../common/components/inputs/Input";
import { IconSearch } from "../common/components/icons/IconSearch";
import { getUserFavourites } from "../api/userApi";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getProductsById } from "../api/productsApi";
import { ProductT } from "../modules/products/interfaces/product";
import { Product } from "../modules/products/components/Product";
import { NextImage } from "../common/components/NextImage";
import { Button } from "../common/components/Button";
import { Filters } from "../modules/filters/components/Filters";
import { getLayout } from "../common/components/layout/Layout";
import { getInitialData } from "../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Избранное ", link: "/" },
];

type Props = {
  productId: string[];
};

export default function FavouritesPage({ productId }: Props) {
  const [search, setSearch] = useState("");
  const [products, setProduct] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);

  const productFilter = useMemo(
    () =>
      search
        ? products?.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
        : products,
    [products, search]
  );

  useEffect(() => {
    if (productId.length) {
      const products = productId.map((id) => getProductsById(id).then((res) => res.data));
      Promise.all(products).then((data) => {
        setLoading(false);
        setProduct(data as any);
      });
    }
  }, [productId]);

  return productId.length ? (
    <ContainerArticle>
      <CustomContainer padding={"md"} paddingMB={"md"}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ContainerTitle>
          <TitleH1 title={"Избранное"} smallText={`${productId.length} товаров`} />
          <Filters.Sorting noneTitleMobile positions={"right"} />
        </ContainerTitle>
      </CustomContainer>
      <CustomContainer padding={"sm"} paddingMB={"md"}>
        <InputContainer>
          <ContainerIcon>
            <IconSearch />
          </ContainerIcon>
          <CustomInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Найти товар в избранном"
          />
        </InputContainer>
      </CustomContainer>
      <ContainerProducts>
        {loading
          ? [...Array(productId.length)].map((el: string) => (
              <Product.ProductSkeletonLoading key={el} />
            ))
          : productFilter.map((el) => <Product.Card key={el.id} {...el} />)}
      </ContainerProducts>
    </ContainerArticle>
  ) : (
    <EmptyContainer>
      <ContainerImage>
        <NextImage src={"/images/favorites.png"} alt={"empty"} />
      </ContainerImage>
      <h2>Избранных товаров пока нет</h2>
      <p>Войдите в свой аккаунт, чтобы сохранять и просматривать товары на любых устройствах</p>
      <CustomButton typeBtn={"blue"}>Войти</CustomButton>
    </EmptyContainer>
  );
}

FavouritesPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/favourites",
    });
    const [productId] = await Promise.allSettled([getUserFavourites()]);

    return {
      props: {
        productId: productId.status === "fulfilled" ? productId.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticle = styled.article`
  @import "variables";

  margin-bottom: 60px;
  min-height: 400px;

  @include respond-to(small) {
    margin-bottom: 36px;
  }
`;

const ContainerProducts = styled(Container)`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  margin-top: 16px;

  @include respond-to(small) {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    grid-row-gap: 8px;
    grid-column-gap: 8px;
    margin-top: 8px;
  }
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomContainer = styled(Container)<{
  padding?: "sm" | "md";
  paddingMB?: "sm" | "md";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 16px;
  }
  &.padding-md {
    padding-top: 20px;
  }

  @include respond-to(small) {
    &.paddingMB-sm {
      padding-top: 8px;
    }
    &.paddingMB-md {
      padding-top: 12px;
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const ContainerIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  display: flex;
`;

const CustomInput = styled(InputStyle)`
  @import "variables";

  padding: 14px 14px 14px 45px;
  border: none;

  /* Chrome, Firefox, Opera, Safari 10.1+ */
  &::placeholder {
    color: $blue-1;
    opacity: 1; /* Firefox */
  }

  /* Internet Explorer 10-11 */
  &:-ms-input-placeholder {
    color: $blue-1;
  }

  /* Microsoft Edge */
  &::-ms-input-placeholder {
    color: $blue-1;
  }

  @include respond-to(small) {
    padding: 11px 45px;
  }
`;

const EmptyContainer = styled(Container)`
  @import "variables";

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px auto;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  text-align: center;

  h2 {
    margin: 24px 0 0;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 12px 0 0;
  }

  @include respond-to(small) {
    padding: 20px;
    margin-bottom: 36px;
    font-size: 20px;
    line-height: 137%;

    h2 {
      margin-top: 32px;
    }

    p {
      font-size: 13px;
      line-height: 20px;
      margin-top: 16px;
    }
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  width: 220px;
  height: 220px;

  @include respond-to(small) {
    width: 180px;
    height: 180px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 16px 40px;
  margin-top: 20px;

  @include respond-to(small) {
    width: 100%;
    margin-top: 24px;
  }
`;
