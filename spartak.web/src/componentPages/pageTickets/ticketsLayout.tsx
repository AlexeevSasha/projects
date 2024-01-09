import { useRouter } from "next/router";
import React, { FC, useContext, useMemo } from "react";
// import styled from "styled-components";
import { PageProps } from "../../../pages/_app";
import { IBlocksOfMatch } from "../../api/dto/IBlocksOfMatch";
// import { ITournamentAndSeasons } from "../../api/dto/ITournamentAndSeasons";
// import { theme } from "../../assets/theme/theme";
import { INavMenuList } from "../../components/header/component/getMenuItems";
import { GetLayout } from "../../components/layout/getLayout";
import { NavMenuWithFilter } from "../../components/navMenu/navMenuWithFilter";
import { DataContext } from "../../core/dataProvider";
// import { MatchFilters } from "./matchFilters";
import { SectionHelloTickets } from "./sectionHelloTickets";
import { TicketsTabMenu } from "./ticketsTabMenu";
import { IFilterDataExcursion, ToursFilter } from "./toursFilter";

const subMenuItems: INavMenuList[] = [
  { label: "tickets/matches", link: "/tickets/matches" },
  { label: "tickets/abonements", link: "/tickets/abonements" },
  { label: "tickets/excursion", link: "/tickets/excursions" },
  { label: "tickets/info", link: "/tickets/info" },
];

export type LayoutsProps = PageProps & {
  blockOfMatches?: IBlocksOfMatch;
  // tournamentsAndSeasons?: ITournamentAndSeasons[];
  filterData?: IFilterDataExcursion[];
};

export const getTicketsLayout = (page: JSX.Element, props: LayoutsProps) =>
  GetLayout(<TicketsLayout {...props}>{page}</TicketsLayout>, props);

const TicketsLayout: FC<LayoutsProps> = ({ children, ...props }) => {
  const { blockOfMatches, /*tournamentsAndSeasons,*/ filterData } = props;
  const { query, pathname } = useRouter();
  const { data: { teams = [] } = {} } = useContext(DataContext);

  const title = teams.find(({ Id }) => query?.team === Id)?.FullName ?? { Ru: "Команда", En: "Team" };
  const existQueryParams = !pathname.includes("matches") || query.team;
  const showTabs = useMemo(() => {
    return !query.team || query.team === teams[0]?.Id;
  }, [query, teams]);

  return (
    <>
      <TicketsTabMenu title={title} />

      <SectionHelloTickets showScroll blockOfMatches={blockOfMatches} />

      {existQueryParams && (
        <NavMenuWithFilter menuList={showTabs ? subMenuItems : [subMenuItems[0], subMenuItems[3]]}>
          {/* {pathname.includes("matches") && query.tournamentId && tournamentsAndSeasons && (
            <StylingFilter>
              <MatchFilters tournamentsAndSeasons={tournamentsAndSeasons} hasNoSeasons />
            </StylingFilter>
          )} */}

          {pathname.includes("excursions") && <ToursFilter filterData={filterData} />}
        </NavMenuWithFilter>
      )}

      {children}
    </>
  );
};

// const StylingFilter = styled.div`
//   form {
//     justify-content: end;
//   }

//   @media screen and (max-width: ${theme.rubberSize.desktop}) {
//     width: 100%;
//     form {
//       margin: 24px 0 0;
//       label {
//         width: 32.33vw;
//       }
//     }
//   }

//   @media screen and (max-width: ${theme.rubberSize.tablet}) {
//     form {
//       label {
//         width: 100%;
//       }
//     }
//   }
// `;
