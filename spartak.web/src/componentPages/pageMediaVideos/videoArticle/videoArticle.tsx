import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { CustomPlayer } from "../../../components/customPlayer/customPlayer";

interface IProps {
  urlVideo?: string[];
  text?: string;
  announce?: string;
}

export const VideoArticle = (props: IProps) => {
  return (
    <StyledContainer>
      {props.urlVideo && props.urlVideo.length > 0
        ? props.urlVideo.map((elem, index) => <CustomPlayer key={"CustomYouTubePlayer" + index} url={elem} />)
        : null}

      {props.announce ? <AnnounceBlock dangerouslySetInnerHTML={{ __html: props.announce }} /> : null}

      {props.text ? <TextBlock dangerouslySetInnerHTML={{ __html: props.text }} /> : null}
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  word-wrap: break-word;
  width: 100%;
  padding: 2.08vw;
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  color: ${({ theme }) => theme.colors.white_black};
  box-sizing: border-box;

  iframe {
    min-height: 36.25vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    width: 100vw;
    margin-left: -3.2vw;

    iframe {
      height: 67.41vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: -4.5vw;
    padding: 6.4vw;

    iframe {
      height: 65.6vw;
    }
  }
`;

const TextBlock = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white_black};

  img {
    max-width: 100%;
  }

  a {
    color: ${theme.colors.red};
  }
`;
const AnnounceBlock = styled(TextBlock)`
  color: ${({ theme }) => theme.colors.gray_grayDark};
  text-transform: uppercase;
`;
