import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { getDateFromString, toISOString } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { InputDate } from "../../../components/input/inputDate";
import { CustomSelect } from "../../../components/select/select";
import { filterOptions } from "./filterOptions";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { ThemeContext } from "../../../core/themeProvider";

type FilterType = {
  PayStatus?: string;
  DateFrom?: string;
  DateTo?: string;
};

export const TicketsFilter = () => {
  const { locale = "ru", push, pathname, query } = useRouter();
  const status = query.PayStatus && String(query.PayStatus);
  const dateFrom = query.DateFrom && String(query.DateFrom);
  const dateTo = query.DateTo && String(query.DateTo);
  const { isDarkTheme } = useContext(ThemeContext);
  const onChange = (values: FilterType) => push({ pathname, query: { ...query, page: 1, ...values } });
  const ticketsOptions = useMemo(
    () => filterOptions.map(({ value, label }) => ({ value, label: getLocalValue(label, locale) })),
    [locale]
  );

  return (
    <Container>
      <Select
        lightStyle={!isDarkTheme}
        value={status ? ticketsOptions.find(({ value }) => value === status) : ticketsOptions[0]}
        onChange={(value) => onChange({ PayStatus: String(value) })}
        options={ticketsOptions}
      />

      <InputDate
        lightStyle={!isDarkTheme}
        value={getDateFromString(dateFrom)}
        onChange={(date: Date) => onChange({ DateFrom: date ? toISOString(date) : undefined })}
        locale={locale}
      />

      <InputDate
        lightStyle={!isDarkTheme}
        value={getDateFromString(dateTo)}
        onChange={(date: Date) => onChange({ DateTo: date ? toISOString(date) : undefined })}
        locale={locale}
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
