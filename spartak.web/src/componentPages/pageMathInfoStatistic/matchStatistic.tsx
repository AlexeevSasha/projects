import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import type { IStatistic } from "../../api/dto/IStatistic";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { StatisticLine } from "./statisticLine";

interface IProps {
  statistic: IStatistic;
}

export const MatchStatistic = ({ statistic }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      {Object.keys(statistic.HomeTeam).map((key) => (
        <StatisticLine
          key={key}
          showPercent={key === "BallPossession"}
          homeTeam={statistic.HomeTeam[key]}
          guestTeam={statistic.GuestTeam[key]}
          title={lang[locale].matchInfo[key]}
        />
      ))}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin: 3.33vw auto 4.9vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 1.02vw auto 8.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 1.18vw auto 4.27vw;
  }
`;
