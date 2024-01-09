import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { UserPurchaseDto, UserTransactionDto } from "../../../api/profileDenariiRepository";
import { formatDate } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Pagination } from "../../../components/pagination/pagination";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { Tabs } from "../../../components/tabs/tabs";
import { EmptyPurchases } from "./emptyPurchases";
import { EmptyTransactions } from "./emptyTransactions";
import { TransactionsDropDownList } from "./transactionsDropDownList";
import { ThemeContext } from "../../../core/themeProvider";

interface IProps {
  transactionsList: { value: UserTransactionDto[]; count: number };
  buyList: { value: UserPurchaseDto[]; count: number };
  cardOptions: SelectOption[];
  filterValue: SelectOption["value"];
  onFilterChange: (value?: SelectOption["value"]) => void;
}

export const CartInfo = ({ buyList, transactionsList, cardOptions, filterValue, onFilterChange }: IProps) => {
  const { locale = "ru", push, pathname, query } = useRouter();
  const active: "purchases" | "transactions" = query.tab as "purchases" | "transactions";
  const { isDarkTheme } = useContext(ThemeContext);
  const allOption = { label: lang[locale].profile.denariiPage.cartInfo.options.allCards, value: "all" };

  const handleTabChange = (tab: any) => {
    push({ pathname, query: { tab, page: 1 } }, undefined, { scroll: false });
  };

  const header = useMemo(
    () =>
      active &&
      Object.entries(lang[locale].profile.denariiPage.cartInfo[active]).map(([key, value]) => (
        <CartItem key={key} header>
          {value}
        </CartItem>
      )),
    [active]
  );

  const BuyList = useMemo(
    () =>
      buyList.value.map(({ Id, PurchaseDateUtc, Sum, ShopName, BonusSum, SpentDenarius }) => (
        <CartRow active={active === "purchases"} key={Id}>
          <CartItemHeader>
            <CartItemDate>{formatDate(PurchaseDateUtc, "dd.MM.yyyy HH:mm:ss", locale)}</CartItemDate>
          </CartItemHeader>

          <CartItemHeader>
            <CartItem>{Sum.toFixed(2)} ₽</CartItem>
          </CartItemHeader>

          <CartItemHeader>
            <MobileHeader>{lang[locale].profile.denariiPage.cartInfo[active].shop}</MobileHeader>
            <CartItem>{ShopName}</CartItem>
          </CartItemHeader>

          <CartItemHeader>
            <MobileHeader>{lang[locale].profile.denariiPage.cartInfo[active].accumulated}</MobileHeader>
            <CartItem>{BonusSum.toFixed(2)}</CartItem>
          </CartItemHeader>

          <CartItemHeader>
            <MobileHeader>{lang[locale].profile.denariiPage.cartInfo[active].spent}</MobileHeader>
            <CartItem>{SpentDenarius.toFixed(2)}</CartItem>
          </CartItemHeader>
        </CartRow>
      )),
    [buyList.value]
  );

  const TransitionsList = useMemo(
    () => transactionsList.value.map((elem) => <TransactionsDropDownList transactions={elem} key={elem.Id} />),
    [transactionsList.value]
  );

  return (
    <Container>
      <InfoTitleBlock>
        <InfoTitle>{lang[locale].profile.denariiPage.cartInfo.title}</InfoTitle>
      </InfoTitleBlock>

      <TabSelectBlock>
        <Tabs
          tabs={[
            { label: lang[locale].profile.denariiPage.cartInfo.tabs.purchases, key: "purchases" },
            { label: lang[locale].profile.denariiPage.cartInfo.tabs.transactions, key: "transactions" },
          ]}
          onClick={handleTabChange}
          active={active}
        />

        <ContainerSelect>
          <CustomSelect
            id="profileCartSelect"
            lightStyle={!isDarkTheme}
            options={[allOption, ...cardOptions]}
            onChange={(value) => onFilterChange(value !== "all" ? (value as SelectOption["value"]) : undefined)}
            value={cardOptions.find(({ value }) => value === filterValue) || allOption}
          />
        </ContainerSelect>

        <Border />
      </TabSelectBlock>

      <CartList>
        {!!(buyList.value.length || transactionsList.value.length) && <CartRow header>{header}</CartRow>}

        {active === "purchases" ? (
          BuyList.length ? (
            BuyList
          ) : (
            <EmptyPurchases />
          )
        ) : TransitionsList.length ? (
          TransitionsList
        ) : (
          <EmptyTransactions />
        )}
      </CartList>

      <Pagination
        itemsCount={active === "purchases" ? buyList.count : transactionsList.count}
        currentPage={+(query?.page || 1)}
        pageSize={10}
      />
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 4.69vw;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 8.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }

  & > *:first-child {
    margin-bottom: 2.08vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-bottom: 3.26vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-bottom: 6.67vw;
    }
  }
`;

const InfoTitleBlock = styled.p`
  margin: 0;
`;

const InfoTitle = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const TabSelectBlock = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: 6.67vw;
    }

    & > * {
      width: 100%;
    }
  }
`;

const ContainerSelect = styled.div`
  width: 12.71vw;
  // .react-select__control {
  //   border-color: ${({ theme }) => theme.colors.grayDark_gray1};
  //   background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  // }
  // .react-select__single-value {
  //   color: ${({ theme }) => theme.colors.white_grayDark};
  // }
  // .react-select__option.react-select__option--is-selected {
  //   background: ${theme.colors.red};
  // }
  // .react-select__indicators {
  //   svg {
  //     path {
  //       color: ${({ theme }) => theme.colors.gray_grayDark1};
  //     }
  //   }
  // }
  // & .react-select__menu {
  //   border-color: ${({ theme }) => theme.colors.grayDark_gray1};
  //   background: ${({ theme }) => theme.colors.blackLight_white};
  //   color: ${({ theme }) => theme.colors.white_black};
  // }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 31.81vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;

    & div.react-select__control {
      height: 10.13vw;
    }
  }
`;

const CartList = styled.div`
  width: inherit;
`;

const CartRow = styled.div<{ header?: boolean; active?: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: 18.85vw 12.92vw 13.96vw 13.96vw auto;
  background-color: ${({ header, theme }) => (header ? theme.colors.blackLight_red : theme.colors.black_white)};
  margin: 0;
  padding: ${({ header }) => (header ? "0.83vw 2.08vw" : "1.67vw 2.08vw")};
  border-bottom: ${({ header, active, theme }) => !header && active && `0.05vw solid ${theme.colors.grayDark_gray1}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 17vw 18.57vw auto 18.57vw 18.57vw;
    padding: ${({ header }) => (header ? "0 2.09vw" : "3.39vw 2.09vw")};
    height: ${({ header }) => (header ? "6.25vw" : "unset")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ header }) => (header ? "none" : "grid")};
    grid-template-columns: auto 23.7vw 23.7vw;
    grid-template-rows: max-content 15.46vw;
    grid-row-gap: 4.8vw;
    padding: 6.4vw 0;
    grid-template-areas:
      "first first second"
      " third fourth last";

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

export const CartItemHeader = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.red};
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: space-between;
    height: 100%;
  }
`;

export const CartItem = styled.span<{
  header?: boolean;
  active?: boolean;
  mobileHeader?: boolean;
}>`
  display: block;
  text-transform: ${({ header, active }) => (header ? "uppercase" : active ? "uppercase" : "none")};
  color: ${({ header, active, theme }) =>
    header ? theme.colors.gray_white : active ? theme.colors.red : theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: ${({ header }) => (header ? "bold" : "500")};
  font-size: ${({ header, active }) => (header ? "0.83vw" : active ? "0.83vw" : "1.25vw")};
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${({ header, active }) => (header ? "1.3vw" : active ? "1.56vw" : "2.09vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;
const CartItemDate = styled(CartItem)`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    white-space: break-spaces;
  }
`;

export const MobileHeader = styled.span`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    color: ${theme.colors.gray};
    text-transform: uppercase;
    font-family: "FCSM Text", sans-serif;
    font-size: 2.67vw;
    display: block;
  }
`;

const Border = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    border-bottom: 1px solid ${theme.colors.grayDark};
  }
`;
