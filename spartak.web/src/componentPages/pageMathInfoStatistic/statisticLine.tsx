import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ThemeContext } from "../../core/themeProvider";

type Props = {
  homeTeam: number;
  guestTeam: number;
  title: string;
  showPercent?: boolean;
};

const getPercentFunc = (value1: number, value2: number) => +((value1 * 100) / (value1 + value2)).toFixed(1);

export const StatisticLine = ({ homeTeam = 0, guestTeam = 0, title, showPercent }: Props) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      <StatisticText>
        <span>{showPercent ? `${+homeTeam}%` : +homeTeam}</span>
        <span>{title}</span>
        <span>{showPercent ? `${+guestTeam}%` : +guestTeam}</span>
      </StatisticText>

      <StatisticLineBlock>
        <Indicator
          background1={theme.colors.red}
          background2={isDarkTheme ? theme.colors.blackLight : theme.colors.gray1}
          widthA={+homeTeam + +guestTeam === 0 ? 0 : getPercentFunc(+homeTeam, +guestTeam)}
        />

        <Indicator
          background1={isDarkTheme ? theme.colors.blackLight : theme.colors.gray1}
          background2={isDarkTheme ? theme.colors.white : theme.colors.grayDark1}
          widthA={100 - getPercentFunc(+guestTeam, +homeTeam)}
        />
      </StatisticLineBlock>
    </>
  );
};

const StatisticText = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  text-transform: uppercase;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.73vw;
    margin-bottom: 2.13vw;
  }
`;

const StatisticLineBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  width: 100%;
  margin-bottom: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;

const Indicator = styled.div<{
  background1: string;
  background2: string;
  widthA?: number;
}>`
  height: 1.56vw;
  width: 100%;
  background-color: ${(props) => props.background1};
  position: relative;

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: ${(props) => props.widthA}%;
    background-color: ${(props) => props.background2};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 8.53vw;
  }
`;
