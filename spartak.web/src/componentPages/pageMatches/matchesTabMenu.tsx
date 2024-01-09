import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { ISeason, ITournamentAndSeasons } from "../../api/dto/ITournamentAndSeasons";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IItemMenu, MobileTabMenu } from "../../components/tabMenu/mobileTabMenu";
import { DataContext } from "../../core/dataProvider";

type Props = {
  teamId?: string;
  tournament?: ITournamentAndSeasons;
  season?: ISeason;
};

export const MatchesTabMenu = (props: Props) => {
  const { locale = "ru", query, replace, push, pathname } = useRouter();
  const { data: { teams = [] } = {} } = useContext(DataContext);

  const title = teams.find(({ Id }) => query?.team === Id)?.ShortName ?? { Ru: "Команда", En: "Team" };
  const needReplace =
    query.team !== props.teamId ||
    query.tournamentId !== props.tournament?.Tournament.Id ||
    query.seasonId !== props.season?.Id;

  useEffect(() => {
    needReplace &&
      replace(
        {
          query: {
            team: props.teamId,
            tournamentId: props.tournament?.Tournament.Id,
            ...(props.season?.Id && { seasonId: props.season?.Id }),
          },
        },
        undefined,
        { scroll: false, shallow: true }
      );
  }, [needReplace]);

  const itemsMenu: IItemMenu[] = teams?.map((elem) => {
    return {
      onclick: () => push({ pathname, query: { team: elem.Id } }),
      isActive: query?.team === elem.Id,
      text: getLocalValue(elem.ShortName, locale),
    };
  });

  return <MobileTabMenu title={getLocalValue(title, locale)} itemsMenu={itemsMenu} />;
};
