import { useRouter } from "next/router";
import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { PageProps } from "../../../pages/_app";
import { ITeam } from "../../api/dto/ITeam";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ContainerWithBackgroundImg } from "../../components/containers/containerWithBackgroundImg";
import { GetLayout } from "../../components/layout/getLayout";
import { TabMenu } from "../../components/tabMenu/tabMenu";
import { DataContext } from "../../core/dataProvider";
import { LoadingScreen } from "../../ui/LoadingScreen ";

export const getTeamsLayout = (page: JSX.Element, props: PageProps) => {
  return GetLayout(<TeamLayout>{page}</TeamLayout>, props);
};

const TeamLayout: FC = ({ children }) => {
  const { locale = "ru", query, push } = useRouter();
  const { data: { teams = [] } = {} } = useContext(DataContext);
  const team = teams.find((elem: ITeam) => elem.Id === query.teamId) || teams[0];

  const teamsTabs = useMemo(
    () =>
      teams.map((elem: ITeam) => ({
        text: getLocalValue(elem.ShortName, locale),
        isActive: query.teamId === elem.Id,
        onclick: () => push(`/teams/${elem.Id}`),
      })),
    [teams]
  );

  return !!teams.length ? (
    <>
      <TabMenu itemsMenu={teamsTabs} title={getLocalValue(team.ShortName, locale)} />

      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position={"center"}
        src={team.TeamImageUrl || "/images/teams/TeamsBanner_v1.0.0.png"}
      >
        <Title>{getLocalValue(team?.FullName, locale)}</Title>
      </ContainerWithBackgroundImg>

      {children}
    </>
  ) : (
    <LoadingScreen />
  );
};

const Title = styled.h1`
  display: flex;
  align-items: end;
  z-index: 10;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: 4.58vw;
  line-height: 6.77vw;
  padding: 19.27vw 0 5.21vw 8.75vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    line-height: 11.73vw;
    padding: 20.86vw 0 13.04vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    line-height: 13.33vw;
    padding: 56vw 0 10.67vw 4.27vw;
  }
`;
