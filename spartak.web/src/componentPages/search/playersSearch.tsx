import { useRouter } from "next/router";
import { memo } from "react";
import { IPlayer } from "../../api/dto/IPlayer";
import { SearchResult } from "../../api/dto/search";
import { BlockOfPlayersSearchResult } from "./playersSearchResult/blockOfPlayersSearchResult";
import { TabOfPlayersSearchResult } from "./playersSearchResult/tabOfPlayersSearchResult";

interface IProps {
  players: IPlayer[];
  count: SearchResult["Count"];
}

export const PlayersSearch = memo((props: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfPlayersSearchResult players={props.players} />;
    }

    case "Players": {
      return <TabOfPlayersSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
});
