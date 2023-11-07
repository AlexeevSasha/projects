import styled from "astroturf/react";
import Link from "next/link";

type Props = { visible: boolean };

export const HeaderHelpfulLinks = ({ visible }: Props) => {
  return (
    <Container visible={visible}>
      <ContainerLinks>
        <CustomLink href={"/sale"} withBackground>
          Акции
        </CustomLink>

        <CustomLink href={"/discounts"} withBackground>
          Скидки
        </CustomLink>
      </ContainerLinks>

      <ContainerCategories>
        <CustomLink href={"/catalog/114164"}>Лекарственные средства</CustomLink>
        <CustomLink href={"/catalog/114164"}>Витамины и БАДы</CustomLink>
        <CustomLink href={"/catalog/114164"}>Медицинские изделия</CustomLink>
        <CustomLink href={"/catalog/114164"}>Медтехника</CustomLink>
        <CustomLink href={"/catalog/114164"}>Красота и гигиена</CustomLink>
        <CustomLink href={"/catalog/114164"}>Мама и малыш</CustomLink>
        <CustomLink href={"/catalog/114164"}>Здоровое и лечебное питание</CustomLink>
      </ContainerCategories>
    </Container>
  );
};

const Container = styled.nav<{ visible: boolean }>`
  @import "variables";
  @include transition();

  display: flex;
  justify-content: space-between;

  height: 0;
  margin-top: 0;
  overflow: hidden;

  &.visible {
    height: fit-content;
    margin-top: 16px;
  }
`;

const ContainerLinks = styled.span`
  display: flex;
  align-items: center;
`;

const ContainerCategories = styled.span`
  display: flex;
  align-items: center;
  overflow: auto;
`;

const CustomLink = styled(Link)<{ withBackground?: boolean }>`
  @import "variables";

  white-space: nowrap;
  color: $white;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 8px;
  text-align: center;

  margin-left: 11px;
  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: $blue-2;
  }

  &.withBackground {
    background-color: $blueMain;
    padding: 6px 12px;
    border-radius: 16px;

    margin-left: 12px;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      color: $white;
      opacity: 0.8;
    }
  }
`;
