import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";

export const WeekLine = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Line>
      {["1", "2", "3", "4", "5", "6", "0"].map((day) => (
        <Day key={day}>{lang[locale].monthList.dayOfWeek[day]}</Day>
      ))}
    </Line>
  );
};

const Line = styled.div`
  display: grid;
  grid: auto / 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 1.04vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 3.2vw;
  }
`;

const Day = styled.div`
  font-size: 0.83vw;
  font-family: "FCSM Text", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;
