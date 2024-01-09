import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

type Props = {
  url: string;
};

export const CustomPlayer = ({ url }: Props) => {
  const src = useMemo(() => {
    switch (url) {
      case (url.match(/youtube/) || {}).input:
        return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
      case (url.match(/youtu\.be/) || {}).input:
        return `https://www.youtube.com/embed/${url.replace("https://youtu.be/", "")}`;
      case (url.match(/vk\.com/) || {}).input:
        return url;
      case (url.match(/rutube/) || {}).input:
        return `https://rutube.ru/play/embed/${url.match(/rutube.ru\/video\/(.+)\/?/)?.[1]}`;
      case (url.match(/vimeo/) || {}).input:
        return `https://player.vimeo.com/video/${url.match(/vimeo.com\/(\d+)/)?.[1]}`;
    }
  }, [url]);

  return (
    <Container>
      <iframe src={src} width="640" height="360" frameBorder="0" allow="fullscreen" allowFullScreen />
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    iframe {
      width: 100vw;
    }
  }
`;
