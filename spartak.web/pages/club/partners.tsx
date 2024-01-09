import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import seodata from "../../public/seo/seoData.json";
import { IPartner } from "../../src/api/dto/IPartner";
import { partnerRepository } from "../../src/api/partnerRepository";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { ClubsDropdownList } from "../../src/componentPages/pageClub/clubsDropdownList";
import { BannerHistory } from "../../src/componentPages/pageClub/pageResults/bannerHistory";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NextLink } from "../../src/components/nextLink/nextLink";
import { NoData } from "../../src/components/noData/noData";
import { NextImage } from "../../src/ui/nextImage/nextImage";

interface IProps {
  partnersClub?: IPartner[];
}

export default function Partners(props: IProps) {
  const { locale = "ru" } = useRouter();

  const publishedPartners = useMemo(() => {
    return props.partnersClub?.map((partner, index) => (
      <ClubsDropdownList
        defaultState={!index}
        customTitle={
          <NextLinkStyled url={getLocalValue(partner.PartnerUrl, locale)}>
            <PartnerLogoContainer>
              <NextImage src={`${partner.ImageUrl}`} alt={`${getLocalValue(partner.FullName, locale)}`} />
            </PartnerLogoContainer>
          </NextLinkStyled>
        }
        description={getLocalValue(partner.Information, locale)}
        key={partner.Id}
      />
    ));
  }, [props.partnersClub]);

  return (
    <>
      <BannerHistory />

      {props.partnersClub && props.partnersClub?.length > 0 ? <Container>{publishedPartners}</Container> : <NoData />}
    </>
  );
}

Partners.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const [partnerRes] = await Promise.allSettled([
    partnerRepository.fetchPartners({ sorting: "SortOrder asc", Section: "Site", Status: "Published" }),
  ]);

  return {
    props: {
      partnersClub: partnerRes.status === "fulfilled" ? partnerRes.value.value : [],
      metaTags: (seodata as Record<string, any>)["/club/partners"] || null,
      title: "partners",
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin: 4.17vw auto 5.21vw;

  section > div:first-of-type {
    padding-top: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto 21.33vw;
  }
`;

const PartnerLogoContainer = styled.div`
  padding: 1.25vw 0;
  filter: ${({ theme }) => theme.colors.none_invert};
  height: 6.35vw;
  width: 13.02vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 0;
    height: 10.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 0;
    height: 15.91vw;
    width: 32.59vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    height: 32.53vw;
    width: 53.87vw;
  }
`;
const NextLinkStyled = styled(NextLink)`
  width: 100%;
  height: 100%;
`;
