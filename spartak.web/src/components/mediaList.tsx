import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import { ICategory } from "../api/dto/ICategory";
import { IMedia, IMediaShort, listFieldMediaShort } from "../api/dto/IMedia";
import { mediaRepository } from "../api/mediaRepository";
import { getLocalValue } from "../assets/helpers/getLocalValue";
import { theme } from "../assets/theme/theme";
import { EmptyScreenMatches } from "../componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { ThemeContext } from "../core/themeProvider";
import { LoadingScreen } from "../ui/LoadingScreen ";
import { MoreButton } from "./buttons/moreButton";
import { CardNews } from "./cardNews/cardNews";
import { CardVideo } from "./cardVideo/cardVideo";
import { ClickPlayVideo } from "./clickPlayVideo/clickPlayVideo";
import { ContainerContent } from "./containers/containerContent";
import { MediaBanner } from "./mediaBanner";

const pageSize = 6;

interface IMediaListProps {
  teamId?: string;
  section: "None" | "Academy" | "Site";
  fromDate?: Date;
  mediaType?: string;
  children?: JSX.Element;
  hideBanner?: boolean;
  categoryInfo?: ICategory;
}

export const MediaList = (props: IMediaListProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<IMedia[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  const [showNextLoader, setShowNextLoader] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { locale = "ru", query } = useRouter();
  const [mediaTypeFilter, setMediaTypeFilter] = useState(
    props.mediaType ? props.mediaType : query.mediaType != "All" ? String(query.mediaType) : undefined
  );

  const { isDarkTheme } = useContext(ThemeContext);
  const [fromDate, setFromDate] = useState<Date>(
    query.year && query.month ? new Date(+query.year, +query.month + 1, 1) : new Date()
  );

  const LoadMedia = async (curPage: number = currentPage, maxDate: Date = fromDate) => {
    const mediaTypeFilter = props.mediaType
      ? props.mediaType
      : query.mediaType != "All"
      ? String(query.mediaType)
      : undefined;
    const categoryId = query.category?.toString();
    setShowNextLoader(true);
    setShowMoreButton(true);
    mediaRepository
      .fetchMedia(
        categoryId && categoryId != "0"
          ? {
              TeamsIds: props.teamId,
              currentPage: curPage,
              MediaType: mediaTypeFilter,
              IsDraft: "false",
              PublishDateTimeLt: maxDate.toISOString(),
              PublishDateTime: true,
              MediaHeader: locale,
              pageSize,
              sorting: "PublishDateTime desc",
              Section: props.section,
              MediaCategoryId: categoryId,
            }
          : {
              TeamsIds: props.teamId,
              currentPage: curPage,
              MediaType: mediaTypeFilter,
              IsDraft: "false",
              PublishDateTimeLt: maxDate.toISOString(),
              PublishDateTime: true,
              MediaHeader: locale,
              pageSize,
              sorting: "PublishDateTime desc",
              Section: props.section,
            },
        listFieldMediaShort
      )
      .then((gallery) => {
        setList((list) => list.concat(gallery.value || []));

        if (Object.getOwnPropertyDescriptor(gallery, "@odata.count")) setShowNextLoader(() => false);
        else {
          setTimeout(() => {
            LoadMedia();
          }, 1000);
        }

        if (gallery["@odata.count"] && gallery["@odata.count"] <= pageSize * curPage) {
          setShowMoreButton(false);
        }
        setCurrentPage((currentPage) => currentPage + 1);
      })
      .catch(() => {
        setShowNextLoader(true);
      });
  };

  useEffect(() => {
    if (query.year && query.month && query.category != undefined) {
      setLoading(true);
      setList(() => []);
      setCurrentPage(() => 1);
      const date = query.year && query.month ? new Date(+query.year, +query.month + 1, 1) : new Date();
      setFromDate(date);
      LoadMedia(1, date);
      setLoading(false);
      setMediaTypeFilter(
        props.mediaType ? props.mediaType : query.mediaType != "All" ? String(query.mediaType) : undefined
      );
    }
  }, [query]);

  const emptyList = useMemo(() => {
    const mediaTypeFilter = props.mediaType ? props.mediaType : String(query.mediaType);
    return props.section === "Academy" ? (
      <EmptyScreenMatches
        text={lang[locale].academy.emptyScreen.noRequest[mediaTypeFilter]}
        title={lang[locale].academy.emptyScreen.noData[mediaTypeFilter]}
        srcImg={`/images/academy/mediaEmptyScreen/${mediaTypeFilter}${isDarkTheme ? "White" : "Black"}.svg`}
      />
    ) : mediaTypeFilter === "Gallery" ? (
      <EmptyScreenMatches
        text={lang[locale].profile.matches.noPhotoRequest}
        title={lang[locale].profile.matches.noPhoto}
        srcImg={`/images/emptyScreen/mediaGallery/${isDarkTheme ? "darkTheme" : "lightTheme"}/image.svg`}
      />
    ) : mediaTypeFilter === "News" ? (
      <EmptyScreenMatches
        text={lang[locale].profile.matches.noNewsRequest}
        title={lang[locale].profile.matches.noNews}
        srcImg={`/images/emptyScreen/mediaNews/${isDarkTheme ? "darkTheme" : "lightTheme"}/newspaper.svg`}
      />
    ) : mediaTypeFilter.includes("Video") ? (
      <EmptyScreenMatches
        text={lang[locale].profile.matches.noVideoRequest}
        title={lang[locale].profile.matches.noVideo}
        srcImg={`/images/emptyScreen/mediaVideo/${isDarkTheme ? "darkTheme" : "lightTheme"}/camera.svg`}
      />
    ) : (
      <></>
    );
  }, [props, query]);

  const getMediaCard = (value: IMedia) => {
    const mediaTypeFilter = props.mediaType ? props.mediaType : String(query.mediaType);
    switch (mediaTypeFilter) {
      case "News": {
        return (
          <CardNews
            key={value.Id}
            news={value}
            defaultUrl={value.Section === "Site" ? "/media/news/" : "/academy/media/"}
          />
        );
      }
      case "Gallery": {
        return (
          <CardNews
            key={value.Id}
            news={value}
            defaultUrl={value.Section === "Site" ? "/media/gallery/" : "/academy/media/"}
          />
        );
      }
      case "Video": {
        return <CardVideo key={value.Id} videoInfo={value} defaultUrl="/media/videos/" clickPlay={setShowModal} />;
      }
      case "All": {
        return value.MediaType === "Video" ? (
          <CardVideo key={value.Id} videoInfo={value} clickPlay={setShowModal} defaultUrl={"/academy/media/"} />
        ) : (
          <CardNews news={value} key={value.Id} defaultUrl={"/academy/media/"} />
        );
      }
      default: {
        return null;
      }
    }
  };

  const getBannerLocationKey = useMemo(() => {
    switch (mediaTypeFilter) {
      case "Gallery":
        return "Web.Media.Gallery";
      case "Video":
        return query.category && query.category !== "0" && props.section === "Site"
          ? "Web.Media.VideoCategory"
          : "Web.Media.Video";
      default:
        return "Web.Media.News";
    }
  }, [query, mediaTypeFilter]);

  return isLoading ? (
    <LoadingScreen />
  ) : list?.length > 0 ? (
    <Container>
      {!props.hideBanner && mediaTypeFilter?.includes("Video") && (
        <BannerContainer>
          <MediaBanner locationKey={getBannerLocationKey} />
        </BannerContainer>
      )}

      {props.mediaType === "Video" && props.section === "Site" && props.categoryInfo && (
        <LayoutTitle>{getLocalValue(props.categoryInfo?.CategoryName, locale)}</LayoutTitle>
      )}

      <ListNews>{list.map((value: IMedia) => getMediaCard(value))}</ListNews>
      {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
      {showNextLoader && (
        <NextLoading>
          <Balls>
            <div className="ball one"></div>
            <div className="ball two"></div>
            <div className="ball three"></div>
          </Balls>
        </NextLoading>
      )}
      {showMoreButton && (
        <MoreButton type="opacity" onClick={() => LoadMedia()}>
          {lang[locale].button.loadMore}
        </MoreButton>
      )}
      {!props.hideBanner && !mediaTypeFilter?.includes("Video") && (
        <BannerContainer>
          <MediaBanner locationKey={getBannerLocationKey} />
        </BannerContainer>
      )}
    </Container>
  ) : (
    <>{emptyList}</>
  );
};

const Container = styled(ContainerContent)`
  margin: 2.08vw auto 2.6vw;
  position: relative;
  flex-direction: column;

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
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 4.27vw;
    margin-bottom: 4.27vw;
  }
`;

const NextLoading = styled.div`
  position: relative;
  height: 10vh;
`;
const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ball {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${theme.colors.red};
    margin: 0 6px 0 0;
    animation: oscillate 0.5s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const BannerContainer = styled.div`
  margin-bottom: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 3.91vw;
  }

  @media screen and (max-width: ${theme.rubberSize.phone}) {
    margin-bottom: 4.27vw;
  }
`;

const LayoutTitle = styled.h1`
  font-size: 3.75vw;
  line-height: 1;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  width: 100%;
  text-align: left;
  padding-bottom: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-bottom: 3.26vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding-bottom: 4.27vw;
  }
`;
