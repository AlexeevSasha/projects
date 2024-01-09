import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { ThemeContext } from "../../../core/themeProvider";

export const LoyaltyFilter = () => {
  const { push, pathname, query } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const yearOptions = useMemo(() => {
    const year = new Date().getFullYear();
    const arrYear = new Array(year - 2015).fill(1);
    return arrYear.map(
      (_, index): SelectOption => ({ value: (year - index).toString(), label: (year - index).toString() })
    );
  }, []);

  return (
    <Container>
      <Select
        lightStyle={!isDarkTheme}
        value={yearOptions.find(({ value }) => value === query.Year) || yearOptions[0]}
        onChange={(Year: any) => push({ pathname, query: { ...query, Year, page: 1 } }, undefined, { scroll: false })}
        options={yearOptions}
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
