import styled from "astroturf/react";
import { ModalProps, ModalNames } from "common/interfaces/modal";
import React, { useCallback, useContext, useState } from "react";
import { IconArraySmall } from "../../icons/IconArraySmall";
import { IconCross } from "../../icons/IconCross";
import { IconOrder } from "../../icons/IconOrder";
import { IconSale } from "../../icons/IconSale";
import { IconStock } from "../../icons/IconStock";
import { IconWatch } from "../../icons/IconWatch";
import { NextImage } from "../../NextImage";
import { AppContext } from "../../ContextProvider";
import { getCategoriesCash } from "../../../utils/cashCategories";
import { CategoryT } from "../../../../modules/categories/interfaces/category";
import { CatalogChildren } from "./CatalogChildren";
import Link from "next/link";

type Props = ModalProps;

const CatalogModal = ({ onClose }: Props) => {
  const { initialData } = useContext(AppContext);

  const [close, setClose] = useState(false);
  const closeModal = () => {
    setClose(true);
    setTimeout(() => onClose?.(ModalNames.POPUP_MODAL), 200);
  };

  const [activeCategory, setActiveCategory] = useState<{ id: string; title: string }[]>([]);
  const [childrenId, setChildrenId] = useState<string[]>([]);
  const [childrenCategories, setChildrenCategories] = useState<{
    [key: string]: CategoryT[];
  }>({});

  const getCategories = useCallback(
    async (id: string, position: number, name: string) => {
      const category = await getCategoriesCash(id);
      if (position === -1) {
        setActiveCategory([{ id: id, title: name }]);
        setChildrenId([id]);
        setChildrenCategories({ [id]: category });
      } else {
        setActiveCategory((prev) => [...prev.slice(0, position + 1), { id: id, title: name }]);
        setChildrenId((prev) => [...prev.slice(0, position + 1), id]);
        setChildrenCategories((prev) => ({ ...prev, [id]: category }));
      }
    },
    [childrenId]
  );

  return (
    <>
      <Container closing={close}>
        <Close onClick={closeModal}>
          <IconCross />
        </Close>
        <ContentContainer>
          <CategoriesMainContainer>
            <Title>Каталог</Title>
            {initialData?.mainCategories?.slice(1).map((elem) => {
              const active = !!activeCategory.find((el) => el.id === elem.id);
              return (
                <LinkMain
                  key={elem.id}
                  active={active}
                  onClick={() => getCategories(elem.id, -1, elem.name)}
                >
                  <span>
                    <ImageContainer active={active}>
                      <NextImage src={elem.image} alt={elem.name} />
                    </ImageContainer>
                    <span>{elem.name}</span>
                  </span>
                  <IconArraySmall size={"md"} rotate="-90deg" />
                </LinkMain>
              );
            })}
            <Line />
            <LinkToPage href={"/sale"}>
              <IconStock /> <span>Акции</span>
            </LinkToPage>
            <LinkToPage href={""}>
              <IconSale /> <span>Скидки</span>
            </LinkToPage>
            <LinkToPage href={""}>
              <IconOrder /> <span>Вы заказывали раньше</span>
            </LinkToPage>
            <LinkToPage href={""}>
              <IconWatch /> <span>Недавно просматривали</span>
            </LinkToPage>
          </CategoriesMainContainer>
          {childrenId.map((el, index) => (
            <CatalogChildren
              id={el}
              activeCategory={activeCategory}
              position={index}
              key={el}
              categories={childrenCategories}
              getCategories={getCategories}
            />
          ))}
        </ContentContainer>
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default CatalogModal;

const Container = styled.div<{ closing: boolean }>`
  @import "variables";

  position: relative;
  display: block;
  background: $white;
  border-radius: 40px;
  width: fit-content;
  height: fit-content;
  z-index: 10;
  margin: 16px 72px 0 16px;
  @include modal(openPopupRight);

  @include respond-to(small) {
    margin: 0 30px 0 20px;
    width: 100%;
  }

  &.closing {
    @include modal(closePopupRight);
  }
`;

const Close = styled.span`
  @import "variables";

  position: absolute;
  top: 0;
  right: -72px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 18px;
  background: $white;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }

  @include respond-to(small) {
    display: none;
  }
`;

const BlackBG = styled.div`
  @import "variables";

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba($black, 0.2);
  z-index: 9;
`;

const ContentContainer = styled.div`
  padding: 32px 48px;
  display: flex;
`;

const ImageContainer = styled.div<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  opacity: 0.4;

  &.active {
    opacity: 1;
  }
`;

const CategoriesMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 12px 16px;
`;

const LinkMain = styled.div<{ active?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 12px;
  padding: 10px 10px 10px 2px;
  grid-column-gap: 56px;

  font-weight: 600;
  font-size: 14px;

  @include transition();

  &.active {
    pointer-events: none;
    background: #f2f5fb;
    color: $blue1;
  }

  span {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
`;

const Line = styled.div`
  @import "variables";

  width: 256px;
  height: 1px;
  background: $blue-2;
  margin: 12px 0;
`;

const LinkToPage = styled(Link)`
  @import "variables";

  display: flex;
  grid-column-gap: 16px;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 4px;

  &:hover {
    color: $blue1;
  }
`;
