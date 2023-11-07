import styled from "astroturf/react";
import { IconStock } from "../icons/IconStock";
import { IconSale } from "../icons/IconSale";
import { IconOrder } from "../icons/IconOrder";
import { IconWatch } from "../icons/IconWatch";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CategoryT } from "../../../modules/categories/interfaces/category";
import { IconArraySmall } from "../icons/IconArraySmall";
import { getCategoriesCash } from "../../utils/cashCategories";
import { CatalogListMobileHeader } from "./CatalogListMobileHeader";
import { ChildrenCategoryMobileT, ParentCategoryMobileT } from "../../interfaces/header";
import { AppContext } from "../ContextProvider";
import Link from "next/link";
import { LoadingScreen } from "../LoadingScreen";

type Props = {
  isOpen?: boolean;
};

export const CatalogInMobileHeader = (props: Props) => {
  const { initialData } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [parentCategory, setParentCategory] = useState<ParentCategoryMobileT>({
    id: [],
    title: [],
  });
  const [categories, setCategories] = useState<CategoryT[]>([]);

  const getCategories = useCallback(async (id?: string | null) => {
    if (id === undefined) id = null;
    setLoading(true);
    const categories = await getCategoriesCash(id);
    setCategories(categories);
    setLoading(false);
  }, []);

  // initial categories
  useEffect(() => {
    getCategoriesCash(null, initialData?.mainCategories?.slice(1)).then((res) => {
      setCategories(res);
    });
  }, [initialData]);

  const handelNextCategory = useCallback(({ id, name, parent }: ChildrenCategoryMobileT) => {
    setParentCategory((prev) => ({
      title: [...prev.title, name],
      id: [...prev.id, parent],
    }));
    getCategories(id).then();
  }, []);

  const handelPrevCategory = useCallback(() => {
    setParentCategory((prev) => ({
      id: prev.id.slice(0, -1),
      title: prev.title.slice(0, -1),
    }));
    getCategories(parentCategory.id.at(-1)).then();
  }, [parentCategory]);

  useEffect(() => {
    document.body.style.overflow = props.isOpen ? "hidden" : "auto";
  }, [props.isOpen]);

  return (
    <Container isOpen={props.isOpen}>
      <ContainerHead>
        {parentCategory.title.length ? (
          <BackArrow onClick={handelPrevCategory}>
            <IconArraySmall rotate={"90deg"} />
          </BackArrow>
        ) : null}
        <Title>{parentCategory.title.length ? parentCategory.title.at(-1) : "Каталог"}</Title>
      </ContainerHead>
      <ContainerBody>
        {loading ? <LoadingScreen /> : null}
        <CatalogListMobileHeader handelNextCategory={handelNextCategory} categories={categories} />
        {parentCategory.title.length ? null : (
          <ContainerLinkToPage>
            <LinkToPage href={"/sale"}>
              <IconStock /> <span>Акции</span>
            </LinkToPage>
            <LinkToPage href={"/discounts"}>
              <IconSale /> <span>Скидки</span>
            </LinkToPage>
            <LinkToPage href={""}>
              <IconOrder /> <span>Вы заказывали раньше</span>
            </LinkToPage>
            <LinkToPage href={""}>
              <IconWatch /> <span>Недавно просматривали</span>
            </LinkToPage>
          </ContainerLinkToPage>
        )}
      </ContainerBody>
    </Container>
  );
};

const Container = styled.div<{ isOpen?: boolean }>`
  @import "variables";
  @include transition();

  position: absolute;
  bottom: 0;
  height: 0;
  width: 100%;
  background-color: $blue-3;

  &.isOpen {
    height: 100vh;
    overflow: hidden;
  }
`;

const ContainerHead = styled.div`
  @import "variables";

  position: relative;
  background-color: $blue1;
  border-radius: 0 0 24px 24px;
  padding: 16px;
`;
const ContainerBody = styled.div`
  position: relative;
  padding: 8px;
  height: calc(100vh - 140px);
  overflow: auto;
`;

const Title = styled.div`
  @import "variables";

  padding: 0 30px;
  text-align: center;
  color: $white;
  font-weight: 700;
  font-size: 18px;
`;

const ContainerLinkToPage = styled.div`
  @import "variables";

  background: $white;
  padding: 20px 16px 24px;
  border-radius: 28px;

  & > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const LinkToPage = styled(Link)`
  @import "variables";

  display: flex;
  grid-column-gap: 16px;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 12px 16px;
  cursor: pointer;
  margin-bottom: 4px;
  border-bottom: 1px solid $blue-2;

  &:hover {
    color: $blue1;
  }
`;

const BackArrow = styled.div`
  position: absolute;
  top: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #a8bfe7;
  border-radius: 16px;
`;
