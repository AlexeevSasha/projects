import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { CustomSelect } from "../../../components/select/select";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { ThemeContext } from "../../../core/themeProvider";

const orderFilterOptions = [
  { label: { En: "Current orders", Ru: "Текущие заказы" }, value: "all" },
  { label: { En: "History", Ru: "История" }, value: "history" },
];

export const ProductsFilter = () => {
  const { push, pathname, query, locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const ticketsOptions = useMemo(
    () => orderFilterOptions.map(({ value, label }) => ({ value, label: getLocalValue(label, locale) })),
    [locale]
  );
  return (
    <Container>
      <Select
        lightStyle={!isDarkTheme}
        value={ticketsOptions.find(({ value }) => value === query.Order) || ticketsOptions[0]}
        onChange={(Order: any) => push({ pathname, query: { ...query, Order, page: 1 } }, undefined, { scroll: false })}
        options={ticketsOptions}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.21vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    margin-top: 2.28vw;
  }

  & > * {
    margin-left: 1.25vw;
    width: 12.7vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-left: 2vw;
      width: 30vw;

      &:first-child {
        margin-left: 0;
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 100%;
      margin-left: 0;
      margin-top: 2.28vw;
    }
  }
`;

const Select = styled(CustomSelect)``;
