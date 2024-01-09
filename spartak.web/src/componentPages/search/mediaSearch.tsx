import { useRouter } from "next/router";
import { memo } from "react";
import { IMediaShort } from "../../api/dto/IMedia";
import { SearchResult } from "../../api/dto/search";
import { BlockOfMediaSearchResult } from "./mediaSearchResult/blockOfMediaSearchResult";
import { TabOfMediaSearchResult } from "./mediaSearchResult/tabOfMediaSearchResult";

interface IProps {
  media: IMediaShort[];
  count: SearchResult["Count"];
}

export const MediaSearch = memo((props: IProps) => {
  const { query } = useRouter();

  switch (query.tab) {
    case "All": {
      return <BlockOfMediaSearchResult media={props.media} />;
    }

    case "Media": {
      return <TabOfMediaSearchResult {...props} />;
    }

    default: {
      return null;
    }
  }
});
