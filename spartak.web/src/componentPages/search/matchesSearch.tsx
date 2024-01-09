import { useRouter } from "next/router";
import { memo } from "react";
import { IMatchDto } from "../../api/dto/IMatchDto";
import { SearchResult } from "../../api/dto/search";
import { BlockOfMatchesSearchResult } from "./matchesSearchResult/blockOfMatchesSearchResult";
import { TabOfMatchesSearchResult } from "./matchesSearchResult/tabOfMatchesSearchResult";
import { TabOfTicketsSearchResult } from "./matchesSearchResult/tabOfTicketsSearchResult";

interface IProps {
  matches: IMatchDto[];
  count: SearchResult["Count"];
  isTickets?: boolean;
}

export const MatchesSearch = memo(({ matches, count, isTickets }: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfMatchesSearchResult matches={matches} isTickets={isTickets} />;
    }

    case "Tickets": {
      return <TabOfTicketsSearchResult count={count} matches={matches} />;
    }
    case "Matches": {
      return <TabOfMatchesSearchResult count={count} matches={matches} />;
    }

    default: {
      return null;
    }
  }
});
