import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { ITournamentAndSeasons } from "../../api/dto/ITournamentAndSeasons";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { CustomSelect } from "../../components/select/select";
import { ThemeContext } from "../../core/themeProvider";

type Props = {
  tournamentsAndSeasons?: ITournamentAndSeasons[];
  hasNoSeasons?: boolean;
};

type FilterType = {
  tournament: string;
  season: string;
};

export const MatchFilters = ({ tournamentsAndSeasons, hasNoSeasons }: Props) => {
  const { query, push, locale = "ru" } = useRouter();
  const { control } = useForm<FilterType>();
  const { isDarkTheme } = useContext(ThemeContext);
  const { field: tournament } = useController({
    control,
    name: "tournament",
    defaultValue: query.tournamentId as string,
  });
  const { field: season } = useController({ control, name: "season", defaultValue: query.seasonId as string });

  const seasonOptions = useMemo(
    () =>
      tournamentsAndSeasons
        ?.find((elem) => elem.Tournament.Id === query.tournamentId)
        ?.Seasons.map((elem) => {
          return { value: elem.Id, label: getLocalValue(elem.Name, locale) };
        }),
    [tournamentsAndSeasons, query]
  );

  const tournamentsOptions = useMemo(
    () =>
      tournamentsAndSeasons?.map((elem) => {
        return { value: elem.Tournament.Id, label: getLocalValue(elem.Tournament.Name, locale) };
      }),
    [tournamentsAndSeasons]
  );

  return (
    <GroupSelect>
      <Select
        id="ticketsMatchTournament"
        options={tournamentsOptions}
        value={tournamentsOptions?.find(({ value }) => value === tournament.value)}
        onChange={(value) => {
          tournament.onChange(value);
          const { Id: seasonId } =
            tournamentsAndSeasons?.find((elem) => elem.Tournament.Id === value)?.Seasons[0] || {};
          push({ query: { ...query, tournamentId: value as string, ...(!hasNoSeasons && { seasonId }) } }, undefined, {
            scroll: false,
          });
          season.onChange(seasonId);
        }}
        lightStyle={!isDarkTheme}
      />
      {!hasNoSeasons && (
        <Select
          id="ticketsMatchSeason"
          options={seasonOptions}
          value={seasonOptions?.find(({ value }) => value === season.value)}
          onChange={(value) => {
            season.onChange(value);
            push({ query: { ...query, seasonId: value as string } }, undefined, { scroll: false });
          }}
          lightStyle={!isDarkTheme}
        />
      )}
    </GroupSelect>
  );
};

const GroupSelect = styled.form`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 3.13vw;
    margin-bottom: 5.22vw;
  }
`;

const Select = styled(CustomSelect)`
  width: 12.71vw;

  & .react-select__control {
    border: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 50%;
  }
`;
