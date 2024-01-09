import { useRouter } from "next/router";
import { SearchResult } from "../../api/dto/search";
import { BlockOfTeamsSearchResult } from "./teamsSearchResult/blockOfTeamsSearchResult";
import { TabOfTeamsSearchResult } from "./teamsSearchResult/tabOfTeamsSearchResult";

interface IProps {
  teams: SearchResult["Teams"];
  count: SearchResult["Count"];
}

export const TeamsSearch = (props: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfTeamsSearchResult teams={props.teams} />;
    }

    case "Teams": {
      return <TabOfTeamsSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
};
