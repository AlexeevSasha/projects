import React, { useMemo } from "react";
import { NoData } from "../noData/noData";
import YouTube from "react-youtube";

interface IProps {
  url?: string;
}

export const CustomYouTubePlayer = React.memo((props: IProps) => {
  const videoId = useMemo(() => {
    try {
      return props.url ? new URL(props.url).searchParams.get("v") : undefined;
    } catch (e) {
      return undefined;
    }
  }, [props.url]);

  return videoId ? <YouTube videoId={videoId} /> : <NoData />;
});
