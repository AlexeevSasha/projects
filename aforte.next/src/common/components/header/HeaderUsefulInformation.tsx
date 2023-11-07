import styled from "astroturf/react";
import Link from "next/link";
import { ChooseLocation } from "./ChooseLocation";

type Props = { visible: boolean };

export const HeaderUsefulInformation = ({ visible }: Props) => {
  return (
    <ContentContainer visible={visible}>
      <ChooseLocation />
      <UsefulLinksList>
        <UsefulLink href={"/help/order"}>Как сделать заказ </UsefulLink>
        <UsefulLink href={"/"}>Доставка и оплата</UsefulLink>
        <UsefulLink href={"/blog"}>Полезные статьи</UsefulLink>
        <UsefulLink href={"/company"}>О компании</UsefulLink>
        <UsefulLink href={"/"} param="button">
          Мобильное приложение
        </UsefulLink>
      </UsefulLinksList>
    </ContentContainer>
  );
};

const ContentContainer = styled.div<{ visible: boolean }>`
  @import "variables";
  @include transition();

  display: flex;
  justify-content: space-between;

  height: 0;
  opacity: 0;
  margin-bottom: 0;
  overflow: hidden;

  &.visible {
    height: 28px;
    opacity: 1;
    margin-bottom: 12px;
  }
`;

const UsefulLinksList = styled.nav`
  display: flex;
  align-items: center;
  margin: 0;
`;

const UsefulLink = styled(Link)<{ param?: string }>`
  @import "variables";

  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  padding: 0 9px;
  opacity: 0.7;
  color: $white;

  &:hover {
    color: $blue-1;
  }

  &.param-button {
    white-space: nowrap;
    background-color: $blueMain;
    padding: 6px 12px;
    border-radius: 16px;
    opacity: 1;

    &:hover {
      opacity: 0.8;
      color: $white;
    }
  }
`;
