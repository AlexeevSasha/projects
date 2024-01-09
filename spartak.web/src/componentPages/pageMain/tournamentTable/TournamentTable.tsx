import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ITeam } from "../../../api/dto/ITeam";
import { ITournamentAndSeasons } from "../../../api/dto/ITournamentAndSeasons";
import { ITournamentTable } from "../../../api/dto/ITournamentTable";
import { theme } from "../../../assets/theme/theme";
import { BannerSwiper } from "../../../components/reactSwiper/bannerSwiper";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Table } from "./Table";

type Props = {
  tournaments: ITournamentAndSeasons[];
  tableData: ITournamentTable[];
  team?: ITeam;
};

export const TournamentTable = ({ tournaments, tableData, team }: Props) => {
  const { locale = "ru" } = useRouter();
  const [activeTournament, setActiveTournament] = useState<ITournamentAndSeasons | undefined>(tournaments[0]);

  return (
    <ContainerContent>
      <Container>
        <Header>
          <Title>{lang[locale].mainPage.standings}</Title>

          <Link
            prefetch={false}
            href={{
              pathname: "/matches/standings",
              query: {
                team: team?.Id,
                tournamentId: activeTournament?.Tournament?.Id,
                seasonId: activeTournament?.Seasons?.[0]?.Id,
              },
            }}
            passHref
          >
            <StyledLink>{lang[locale].mainPage.fullTable}</StyledLink>
          </Link>
        </Header>

        <Content>
          <Coll>
            <Table
              // проверка на то что турнир отображается в турнирной таблице
              tournaments={tournaments.filter((elem: ITournamentAndSeasons) => elem.Tournament.ShowTournamentTable)}
              tableData={tableData}
              team={team}
              setActiveTournament={setActiveTournament}
              activeTournament={activeTournament}
            />
          </Coll>

          <Coll>
            <BannerSwiper locationKey="Web.Main.Standings" />
          </Coll>
        </Content>
      </Container>
    </ContainerContent>
  );
};

const Container = styled.div`
  flex-basis: 100%;
  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-height: 7.95vw;
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-height: 9.6vw;
    margin-bottom: 10.67vw;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: end;
  }
`;

const Content = styled.div`
  display: grid;
  grid: auto / 2fr 1fr;
  grid-gap: 1.25vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid: auto / 1fr;
    grid-gap: 3.13vw;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 3.23vw;
  color: ${({ theme }) => theme.colors.white_black};

  :first-letter {
    text-transform: capitalize;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    line-height: 11.2vw;
  }
`;

const StyledLink = styled.a`
  font-weight: 600;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  text-decoration: none;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    white-space: nowrap;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;
    padding-bottom: 3.2vw;
  }
`;

const Coll = styled.div`
  position: relative;
  height: 33.4vw;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 68.45vw;
  }

  & > .banner-slider {
    height: 100%;
    width: 100%;
  }
`;
