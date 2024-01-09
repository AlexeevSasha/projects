import { useRouter } from "next/router";
import { memo } from "react";
import { SearchResult } from "../../api/dto/search";
import { BlockOfInfoSearchResult } from "./infoSearchResult/blockOfInfoSearchResult";
import { TabOfInfoSearchResult } from "./infoSearchResult/tabOfInfoSearchResult";

interface IProps {
  info: SearchResult["Info"];
  count: SearchResult["Count"];
}

export const InfoSearch = memo((props: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfInfoSearchResult info={props.info} />;
    }

    case "Info": {
      return <TabOfInfoSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
});
