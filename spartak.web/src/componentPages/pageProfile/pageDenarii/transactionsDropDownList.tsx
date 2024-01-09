import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { UserTransactionDto } from "../../../api/profileDenariiRepository";
import { formatDate } from "../../../assets/constants/date";
import { MinusIcon } from "../../../assets/icon/minus";
import { PlusIcon } from "../../../assets/icon/plus";
import { theme } from "../../../assets/theme/theme";
import { CartItem, CartItemHeader, MobileHeader } from "./cartInfo";

interface IProps {
  transactions: UserTransactionDto;
}

export const TransactionsDropDownList = ({ transactions }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [isOpenedPanel, setIsOpenedPanel] = useState(false);

  return (
    <TransActionRow active={isOpenedPanel}>
      <CartRow>
        <CartItemHeader>
          <CartItem>{formatDate(transactions.ChargeUtc, "dd.MM.yyyy", locale)}</CartItem>
        </CartItemHeader>

        <CartItemHeader>
          <MobileHeader>{lang[locale].profile.denariiPage.cartInfo.transactions.cartNumber}</MobileHeader>
          <CartItem>{transactions.UserCard.Number}</CartItem>
        </CartItemHeader>

        <CartItemHeader>
          <MobileHeader>{lang[locale].profile.denariiPage.cartInfo.transactions.accrued}</MobileHeader>
          <CartItem>{transactions.Debet.toFixed(2)}</CartItem>
        </CartItemHeader>

        <CartItemHeader>
          <MobileHeader>{lang[locale].profile.denariiPage.cartInfo.transactions.writtenOff}</MobileHeader>
          <CartItem>{transactions.Credit.toFixed(2)}</CartItem>
        </CartItemHeader>

        <CartItemHeader>
          <CartItem active onClick={() => setIsOpenedPanel(!isOpenedPanel)}>
            <More>
              {isOpenedPanel ? (
                <MinusIcon onClick={() => setIsOpenedPanel(false)} />
              ) : (
                <PlusIcon onClick={() => setIsOpenedPanel(true)} />
              )}
              <span>{lang[locale].profile.denariiPage.cartInfo.more}</span>
            </More>
          </CartItem>
        </CartItemHeader>
      </CartRow>

      {isOpenedPanel && (
        <CartDropDown>
          <DropDownItemBlock>
            <DropDownHeader>{lang[locale].profile.denariiPage.cartInfo.detailing.product}</DropDownHeader>

            <DropDownItem>{transactions.ArticleName}</DropDownItem>
          </DropDownItemBlock>

          <DropDownItemBlock>
            <DropDownHeader>{lang[locale].profile.denariiPage.cartInfo.detailing.remainder}</DropDownHeader>

            <DropDownItem>{transactions.Credit.toFixed(2).replace(".", ",")}</DropDownItem>
          </DropDownItemBlock>

          <DropDownItemBlock>
            <DropDownHeader>{lang[locale].profile.denariiPage.cartInfo.detailing.checkNumber}</DropDownHeader>

            <DropDownItem>{transactions.ChequeNumber}</DropDownItem>
          </DropDownItemBlock>

          <DropDownItemBlock>
            <DropDownHeader>{lang[locale].profile.denariiPage.cartInfo.detailing.denariiActivationDate}</DropDownHeader>

            <DropDownItem>{formatDate(transactions.ActiveUtc, "dd.MM.yyyy", locale)}</DropDownItem>
          </DropDownItemBlock>

          <DropDownItemBlock>
            <DropDownHeader>{lang[locale].profile.denariiPage.cartInfo.detailing.denariiBurnDate}</DropDownHeader>

            <DropDownItem>{formatDate(transactions.DecrementUtc, "dd.MM.yyyy", locale)}</DropDownItem>
          </DropDownItemBlock>
        </CartDropDown>
      )}
    </TransActionRow>
  );
};

const More = styled.span`
  display: flex;
  align-items: center;
  gap: 0.42vw;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }

  & svg {
    color: ${theme.colors.red};
    transition: all 0.2s ease-in-out;
    font-size: 1.04vw;
    cursor: pointer;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.61vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 5.33vw;
    }
  }
`;

const TransActionRow = styled.div<{ active: boolean }>`
  border-bottom: ${({ theme }) => `0.05vw solid ${theme.colors.grayDark_gray1}`};
  padding-bottom: ${({ active }) => (active ? "0.42vw" : "0")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: ${({ active }) => (active ? "1.04vw" : "0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: ${({ active }) => (active ? "2.13vw" : "0")};
  }
`;

const CartDropDown = styled.div`
  background-color: ${({ theme }) => theme.colors.blackLight_white1};
  margin: 0;
  display: grid;
  grid-template-columns: 18.85vw 12.92vw 13.96vw 13.96vw auto;
  padding: 1.25vw 2.08vw;
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    white-space: normal;
    padding: 3.13vw;
    grid-template-columns: 30.25vw 30.25vw auto;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    grid-template-columns: auto;
    grid-gap: 4.8vw;
  }
`;

const DropDownItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.52vw;
  }
`;

const DropDownHeader = styled.span`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;
  }
`;

const DropDownItem = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.83vw;
  white-space: break-spaces;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const CartRow = styled.div<{ header?: boolean; active?: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: 18.85vw 12.92vw 13.96vw 13.96vw auto;
  background-color: ${({ header, theme }) => (header ? theme.colors.blackLight_white : theme.colors.black_white)};
  margin: 0;
  padding: ${({ header }) => (header ? "0.83vw 2.08vw" : "1.67vw 2.08vw")};
  border-bottom: ${({ header, active }) => !header && active && `0.05vw solid ${theme.colors.grayDark}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 18vw 18.57vw 18.57vw 18.57vw auto;
    padding: ${({ header }) => (header ? "0 2.09vw" : "3.39vw 2.09vw")};
    height: ${({ header }) => (header ? "6.25vw" : "unset")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ header }) => (header ? "none" : "grid")};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: max-content 11.73vw;
    grid-row-gap: 4.8vw;
    padding: 6.4vw 0;
    grid-template-areas:
      "first first last"
      "second third fourth";

    > :nth-child(1) {
      grid-area: first;
    }

    > :nth-child(2) {
      grid-area: second;
    }

    > :nth-child(3) {
      grid-area: third;
    }

    > :nth-child(4) {
      grid-area: fourth;
    }

    > :nth-child(5) {
      grid-area: last;
    }
  }
`;
