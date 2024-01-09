import React, { useEffect, useState } from "react";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { GetServerSideProps } from "next";
import { ISpecialOffer } from "../../../src/api/dto/ISpecialOffer";
import { useRouter } from "next/router";
import { specialOffersRepository } from "../../../src/api/specialOffers";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../src/assets/theme/theme";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import seodata from "../../../public/seo/seoData.json";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { NewsArticle } from "../../../src/componentPages/pageMediaNews/pageNewsItem/newsArticle/newsArticle";
import { NewsAside } from "../../../src/componentPages/pageMediaNews/pageNewsItem/newsAside/newsAside";
import { fromToDate } from "../../../src/assets/constants/fromToDate";
import { IMediaShort } from "../../../src/api/dto/IMedia";

export default function SpecialOffer() {
  const { locale = "ru", query, push } = useRouter();
  const [loading, setLoading] = useState(false);

  const [specialOffer, setSpecialOffer] = useState<ISpecialOffer>();
  const [othersOffers, setOtherOffers] = useState<ISpecialOffer[]>();

  const fetchSpecialOffer = async () => {
    setLoading(true);
    await specialOffersRepository
      .fetchSpecialOfferById(String(query?.id))
      .then(setSpecialOffer)
      .catch((e) => {
        if (e.type === "errors.EntityNotFoundException.UserSpecialOfferInfo") {
          push("/404");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchSpecialOffers = async () => {
    // setLoading(true);
    await specialOffersRepository.fetchSpecialOffers().then(setOtherOffers);
  };

  useEffect(() => {
    fetchSpecialOffer();
    fetchSpecialOffers();
  }, [query?.id]);

  const convertItems = (offers?: any[]) => {
    return offers?.reduce((res, offer) => {
      if (offer.Id !== query?.id) {
        res.push({
          Id: offer?.Id,
          PreviewPhoto: offer?.PreviewPhoto,
          MediaHeader: offer?.Header,
          MediaType: "News" as IMediaShort["MediaType"],
          Section: "Site" as IMediaShort["Section"],
          MediaCategoryId: offer?.Id,
          MediaCategoryName: "Специальные предложения",
          PublishDateTime: fromToDate(locale, offer?.StartDate, offer?.EndDate),
          PhotoGallery: [],
          VideoUrl: [],
        });
      }
      return res;
    }, []);
  };
  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <TitleWithoutBanner title={getLocalValue(specialOffer?.Header, locale)} smallTitle />
      <SocialNetworksOnBanner date={fromToDate(locale, specialOffer?.StartDate, specialOffer?.EndDate)} />
      <StyledContainer>
        <NewsArticle
          title={getLocalValue(specialOffer?.Announce, locale)}
          text={getLocalValue(specialOffer?.Text, locale)}
        />
        <NewsAside newsList={convertItems(othersOffers)?.slice(0, 3)} defaultUrl={"/profile/specialOffers/"} />
      </StyledContainer>
    </>
  );
}
SpecialOffer.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  const metaTags = metaInterpolate((seodata as Record<string, any>)["/profile/specialOffers/[id]"]);

  return {
    props: { metaTags },
  };
};
const StyledContainer = styled(ContainerContent)`
  display: grid;
  align-items: start;
  grid-template-columns: 2fr 1fr;
  gap: 1.25vw;
  padding-bottom: 3.75vw;
  li {
    display: flex;
    align-items: center;
    :before {
      min-height: 2.08vw;
      min-width: 2.08vw;
      padding-right: 0.63vw;
      content: url("/images/stadium/RedPoint.svg");

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        min-height: 5.22vw;
        min-width: 5.22vw;
        padding-right: 1.56vw;
      }

      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        min-height: 6.4vw;
        min-width: 6.4vw;
        padding-right: 3.2vw;
      }
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    flex-direction: column;
    padding-bottom: 5.22vw;
    gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10.67vw;
  }
`;
