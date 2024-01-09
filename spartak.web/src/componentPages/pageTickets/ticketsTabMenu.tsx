import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { LocaleType } from "../../api/dto/LocaleType";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { MobileTabMenu } from "../../components/tabMenu/mobileTabMenu";
import { DataContext } from "../../core/dataProvider";

type Props = {
  title: LocaleType;
};

export const TicketsTabMenu = ({ title }: Props) => {
  const { locale = "ru", query, push, pathname } = useRouter();
  const { data: { teams = [] } = {} } = useContext(DataContext);

  const items = useMemo(
    () =>
      teams.map(({ Id, FullName }) => ({
        onclick: () => push({ pathname, query: { team: Id } }),
        isActive: query.team === Id,
        text: getLocalValue(FullName, locale),
      })),
    [query.team]
  );

  return <MobileTabMenu title={getLocalValue(title, locale)} itemsMenu={items} />;
};
