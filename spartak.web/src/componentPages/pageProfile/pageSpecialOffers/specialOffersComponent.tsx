import React from "react";
import { Spacer } from "../../../components/spacer";
import { Tabs } from "../../../components/tabs/tabs";
import { lang } from "../../../../public/locales/lang";
import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { useRouter } from "next/router";
import { theme } from "../../../assets/theme/theme";
import { ISpecialOffer } from "../../../api/dto/ISpecialOffer";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { CardNews } from "../../../components/cardNews/cardNews";
import { IMediaShort } from "../../../api/dto/IMedia";
import { fromToDate } from "../../../assets/constants/fromToDate";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";

interface IProps {
  tab: string;
  setTab: (tab: string) => void;
  specialOffers?: ISpecialOffer[];
  loading: boolean;
}

export const SpecialOffersComponent = ({ tab, setTab, specialOffers, loading }: IProps) => {
  const { locale = "ru" } = useRouter();

  const convertItems = specialOffers?.map((offer) => ({
    Id: offer?.Id,
    PreviewPhoto: offer?.PreviewPhoto,
    MediaHeader: offer?.Header,
    ItemType: offer.ItemType,
    MediaType: "News" as IMediaShort["MediaType"],
    Section: "Site" as IMediaShort["Section"],
    MediaCategoryId: offer?.Id,
    MediaCategoryName: "Специальные предложения",
    PublishDateTime: fromToDate(locale, offer?.StartDate, offer?.EndDate),
    PhotoGallery: [],
    VideoUrl: [],
    Announce: offer.ItemType === "Quiz" ? getLocalValue(offer.Announce, locale) : undefined,
  }));

  return (
    <Container>
      <Spacer height={["30px", "30px", "16px"]} />
      <Title>{lang[locale].profile.specialOffers.title}</Title>
      <Spacer height={["40px", "40px", "16px"]} />

      <TabsBlock>
        <Tabs
          tabs={[
            { label: lang[locale].profile.specialOffers.fromClub, key: "FromClub" },
            { label: lang[locale].profile.specialOffers.fromPartners, key: "FromPartners" },
          ]}
          onClick={(tab) => setTab(tab as string)}
          active={tab}
        />
      </TabsBlock>

      <Spacer height={["40px", "40px", "16px"]} />

      {loading ? (
        <LoadingScreen />
      ) : (
        <ListNews>
          {convertItems?.map((offer) => (
            <CardNews
              key={offer.Id}
              news={offer}
              defaultUrl={offer.ItemType === "Quiz" ? "/profile/quiz/" : "/profile/specialOffers/"}
            />
          ))}
        </ListNews>
      )}
      <Spacer height={["40px", "40px", "16px"]} />
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: start;
`;

const ListNews = styled.div`
  width: 100%;
  display: grid;
  align-items: stretch;
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
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-weight: 600;
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
const TabsBlock = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    div {
      width: 100%;
    }
  }
`;
