import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IMediaShort } from "../../api/dto/IMedia";
import { theme } from "../../assets/theme/theme";
import { CardNews } from "../../components/cardNews/cardNews";
import { ContainerContent } from "../../components/containers/containerContent";
import { ThemeContext } from "../../core/themeProvider";
import { EmptyScreenMatches } from "../pageMatches/emptyScreenMatches/emptyScreenMatches";

interface IProps {
  galleryList?: IMediaShort[];
  defaultUrl?: string;
}

export const MediaGalleryList = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return props.galleryList && props.galleryList.length > 0 ? (
    <Container>
      <ListNews>
        {props.galleryList?.map((elem, index) => (
          <CardNews news={elem} key={index} defaultUrl={props.defaultUrl ?? "/media/gallery/"} />
        ))}
      </ListNews>
    </Container>
  ) : (
    <EmptyScreenMatches
      text={lang[locale].profile.matches.photoToBeLater}
      title={lang[locale].profile.matches.noPhoto}
      srcImg={`/images/emptyScreen/mediaGallery/${isDarkTheme ? "darkTheme" : "lightTheme"}/image.svg`}
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 1.25vw;
  grid-row-gap: 2.08vw;

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
