import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IMediaShort } from "../../api/dto/IMedia";
import { theme } from "../../assets/theme/theme";
import { CardVideo } from "../../components/cardVideo/cardVideo";
import { ContainerContent } from "../../components/containers/containerContent";
import { EmptyScreenMatches } from "../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { lang } from "../../../public/locales/lang";
import { useRouter } from "next/router";
import { ClickPlayVideo } from "../../components/clickPlayVideo/clickPlayVideo";
import { ThemeContext } from "../../core/themeProvider";

interface IProps {
  videosList?: IMediaShort[];
}

export const MatchInfoVideosList = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  const { isDarkTheme } = useContext(ThemeContext);

  return props.videosList && props.videosList.length > 0 ? (
    <Container>
      <VideoList>
        {props.videosList?.map((elem) => (
          <CardVideo
            key={elem.Id}
            videoInfo={elem}
            clickPlay={() => setShowModal(elem)}
            defaultUrl={"/media/videos/"}
          />
        ))}
      </VideoList>

      {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
    </Container>
  ) : (
    <EmptyScreenMatches
      text={lang[locale].profile.matches.videoToBeLater}
      title={lang[locale].profile.matches.noVideo}
      srcImg={`/images/emptyScreen/mediaVideo/${isDarkTheme ? "darkTheme" : "lightTheme"}/camera.svg`}
    />
  );
};

const Container = styled(ContainerContent)`
  margin: 2.08vw auto 2.6vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw auto;
  }
`;

const VideoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;
  grid-row-gap: 2.08vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 4.27vw;
  }
`;
