import React, { useContext, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { CardNews } from "../../../components/cardNews/cardNews";
import { ContainerContent } from "../../../components/containers/containerContent";
import type { IMediaShort } from "../../../api/dto/IMedia";
import { EmptyScreenMatches } from "../../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { lang } from "../../../../public/locales/lang";
import { useRouter } from "next/router";
import { CardVideo } from "../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../components/clickPlayVideo/clickPlayVideo";
import { ThemeContext } from "../../../core/themeProvider";

interface IProps {
  newsList?: IMediaShort[];
}

export const MediaNewsList = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  const { isDarkTheme } = useContext(ThemeContext);

  return props.newsList && props.newsList?.length > 0 ? (
    <Container>
      <ListNews>
        {props.newsList?.map((value) => {
          switch (value.MediaType) {
            case "News": {
              return <CardNews key={value.Id} news={value} defaultUrl="/media/news/" />;
            }
            case "Gallery": {
              return <CardNews key={value.Id} news={value} defaultUrl="/media/gallery/" />;
            }
            case "Video": {
              return (
                <>
                  <CardVideo key={value.Id} videoInfo={value} defaultUrl="/media/videos/" clickPlay={setShowModal} />

                  {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
                </>
              );
            }
            default: {
              return null;
            }
          }
        })}
      </ListNews>
    </Container>
  ) : (
    <EmptyScreenMatches
      text={lang[locale].profile.matches.newsToBeLater}
      title={lang[locale].profile.matches.noNews}
      srcImg={`/images/emptyScreen/mediaNews/${isDarkTheme ? "darkTheme" : "lightTheme"}/newspaper.svg`}
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

const ListNews = styled.div`
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
