import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { ITournamentAndSeasons } from "../../../api/dto/ITournamentAndSeasons";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import type { INavMenuList } from "../../../components/header/component/getMenuItems";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { ThemeContext } from "../../../core/themeProvider";

interface IProps {
  tournamentsAndSeasons?: ITournamentAndSeasons[];
  defaultSeason: SelectOption;
  defaultTournament: SelectOption;
  menuList?: INavMenuList[];
}

export const MatchNavBar = (props: IProps) => {
  const { query, push, locale = "ru" } = useRouter();
  const [season, setSeason] = useState<SelectOption>(props.defaultSeason);
  const [tournament, setTournament] = useState<SelectOption>(props.defaultTournament);
  const { isDarkTheme } = useContext(ThemeContext);

  const seasonOptions = useMemo(
    () =>
      props.tournamentsAndSeasons
        ?.find((elem) => elem.Tournament.Id === query.tournamentId)
        ?.Seasons.map((elem) => {
          return { value: elem.Id, label: getLocalValue(elem.Name, locale) };
        }),
    [props.tournamentsAndSeasons, query]
  );

  const tournamentsOptions = useMemo(
    () =>
      props.tournamentsAndSeasons?.map((elem) => {
        return { value: elem.Tournament.Id, label: getLocalValue(elem.Tournament.Name, locale) };
      }),
    [props.tournamentsAndSeasons]
  );

  const changeTournament = (item: SelectOption | null) => {
    if (item) {
      setTournament(item);
      const season = props.tournamentsAndSeasons?.find((elem) => elem.Tournament.Id === item?.value)?.Seasons[0];
      push({ query: { ...query, tournamentId: item.value, seasonId: season?.Id } }, undefined, { scroll: false });
      setSeason({ value: season?.Id || "", label: getLocalValue(season?.Name, locale) || "" });
    }
  };

  const changeSeason = (item: SelectOption | null) => {
    if (item) {
      setSeason(item);
      push({ query: { ...query, seasonId: item?.value } }, undefined, { scroll: false });
    }
  };

  return (
    <NavMenuContainer>
      <ContainerHorizontalScroll>
        <Menu menuList={props.menuList ?? mockSubMenu} usePrevQueryParam noTheme />
      </ContainerHorizontalScroll>

      <GroupSelect>
        <ContainerSelect>
          <CustomSelect
            options={tournamentsOptions}
            value={tournament}
            onSelect={changeTournament}
            id="MatchNavBar1"
            lightStyle={!isDarkTheme}
          />
        </ContainerSelect>

        <ContainerSelect>
          <CustomSelect
            options={seasonOptions}
            value={season}
            onSelect={changeSeason}
            id="MatchNavBar2"
            lightStyle={!isDarkTheme}
          />
        </ContainerSelect>
      </GroupSelect>
    </NavMenuContainer>
  );
};

const mockSubMenu: INavMenuList[] = [
  { label: "matches/forthcoming", link: "/matches/forthcoming", query: {} },
  { label: "matches/past", link: "/matches/past", query: {} },
  { label: "matches/standings", link: "/matches/standings", query: {} },
];

const NavMenuContainer = styled(ContainerContent)`
  margin-top: 2.08vw;
  margin-bottom: 0;
  z-index: 10;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    flex-direction: column;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const Menu = styled(NavMenu)`
  & a {
    color: ${({ theme }) => theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }
`;

const GroupSelect = styled.div`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 3.13vw;
    margin-bottom: 5.22vw;
  }
`;

const ContainerSelect = styled.div`
  width: 12.71vw;

  label > div > div {
    border: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 50%;
  }
`;
