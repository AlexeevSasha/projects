import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import { IPartner } from "../../src/api/dto/IPartner";
import { partnerRepository } from "../../src/api/partnerRepository";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { AcademyLayout } from "../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { ClubsDropdownList } from "../../src/componentPages/pageClub/clubsDropdownList";
import { EmptyScreenMatches } from "../../src/componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { NextLink } from "../../src/components/nextLink/nextLink";
import { ThemeContext } from "../../src/core/themeProvider";
import { NextImage } from "../../src/ui/nextImage/nextImage";

interface IProps {
  partnersAcademy?: IPartner[];
}

export default function Partners(props: IProps) {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const publishedPartners = useMemo(() => {
    return props.partnersAcademy?.map((partner, index) => (
      <ClubsDropdownList
        defaultState={!index}
        customTitle={
          <NextLinkStyled url={getLocalValue(partner.PartnerUrl, locale)}>
            <PartnerLogoContainer isDarkTheme={isDarkTheme}>
              <NextImage src={partner.ImageUrl} alt={`${getLocalValue(partner.FullName, locale)}`} />
            </PartnerLogoContainer>
          </NextLinkStyled>
        }
        description={getLocalValue(partner.Information, locale)}
        key={partner.Id}
      />
    ));
  }, [props.partnersAcademy]);

  return (
    <>
      {props.partnersAcademy && props.partnersAcademy?.length > 0 ? (
        <Container>{publishedPartners}</Container>
      ) : (
        <EmptyScreenMatches
          title={lang[locale].academy.noPartners}
          text={lang[locale].academy.noInfo}
          srcImg={`/images/icon/noCoaches${isDarkTheme ? "Black" : "White"}.svg`}
        />
      )}
    </>
  );
}

Partners.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async () => {
  const [partnerRes] = await Promise.allSettled([
    partnerRepository.fetchPartners({ sorting: "SortOrder asc", Section: "Academy" }),
  ]);

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/academy/partners"] || null,
      title: (seodata as Record<string, any>)["/academy/partners"].h1 || "partners",
      partnersAcademy: partnerRes.status === "fulfilled" ? partnerRes.value.value : [],
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
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

const PartnerLogoContainer = styled.div<{ isDarkTheme?: boolean }>`
  padding: 1.25vw 0;
  position: relative;
  height: 12.71vw;
  width: 6.35vw;
  filter: ${({ theme }) => theme.colors.none_invert};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 0;
    height: 20.33vw;
    width: 10.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 0;
    height: 31.81vw;
    width: 15.91vw;
  }
`;
const NextLinkStyled = styled(NextLink)`
  width: 100%;
  height: 100%;
`;
