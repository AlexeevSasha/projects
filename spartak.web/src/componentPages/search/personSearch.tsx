import { useRouter } from "next/router";
import { SearchResult } from "../../api/dto/search";
import { BlockOfPersonSearchResult } from "./personSearchResult/blockOfPersonSearchResult";
import { TabOfPersonSearchResult } from "./personSearchResult/tabOfPersonSearchResult";

type Props = {
  coaches: SearchResult["Coaches"];
  bosses: SearchResult["Bosses"];
  staff: SearchResult["Staff"];
  count: SearchResult["Count"];
};

export const PersonSearch = (props: Props) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfPersonSearchResult {...props} />;
    }

    case "Club": {
      return <TabOfPersonSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
};
