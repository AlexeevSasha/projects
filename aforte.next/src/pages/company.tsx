import { GetServerSideProps } from "next";
import { getLayout } from "../common/components/layout/Layout";
import { ArticleT } from "../modules/articles/interfaces/article";
import { AsideLinks } from "../common/components/AsideLinks";
import { Articles } from "../modules/articles/components/Articles";
import styled from "astroturf/react";
import { ContainerArticle } from "../common/components/Container";
import { getInitialData } from "../common/hooks/useInitialData";
import { getArticlesList } from "../api/articlesApi";
import { TitleH1 } from "../common/components/TitleH1";
import { NextImage } from "../common/components/NextImage";
import { AboutCompanyCards } from "../common/components/aboutCompany/AboutCompanyCards";
import { PrinciplesOfWork } from "../common/components/aboutCompany/PrinciplesOfWork";
import { CertificatesAndLicenses } from "../common/components/aboutCompany/CertificatesAndLicenses";
import { Contacts } from "../common/components/aboutCompany/Contacts";
import { CompanyT } from "../common/interfaces/company";
import { XSSProtection } from "../modules/products/utils/XSSProtection";
import { CharityT } from "../modules/charity/interfaces/charity";
import { getCharities } from "../api/charityApi";
import { SwiperWithButtonTop } from "../modules/slider/components/SwiperWithButtonTop";
import { Charity } from "../modules/charity/components/Charity";
import { CustomSwiper } from "../modules/slider/components/CustomSwiper";
import { VacancyT } from "../modules/career/interfaces/vacancy";
import { getVacancy } from "../api/careerApi";
import { Career } from "../modules/career/components/Career";
import Link from "next/link";

type Props = {
  articles: ArticleT[];
  charity: CharityT[];
  company: CompanyT;
  vacancy: VacancyT[];
};

export default function CompanyPage({ articles, company, charity, vacancy }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerContent>
        <TitleH1 title={company.title} />
        <ImageContainer>
          <NextImage src={"/images/company.png"} alt={"company"} />
        </ImageContainer>
        <Paragraph
          dangerouslySetInnerHTML={{
            __html: XSSProtection(company.description.replace(/(\r\n|\r|\n)/g, "<br>")),
          }}
        />
        <AboutCompanyCards />
        <ContainerBlock>
          <div>{company.companyValues.title}</div>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: XSSProtection(
                company?.companyValues.description.replace(/(\r\n|\r|\n)/g, "<br>")
              ),
            }}
          />
        </ContainerBlock>
        <PrinciplesOfWork principlesWork={company.principlesWork} />
      </ContainerContent>
      <PositionAside>
        <AsideLinks
          activeLink={"about-company"}
          links={["about-company", "charity", "certificates", "career", "contact"]}
        />
        <Articles.ArticlesPopular articles={articles} />
      </PositionAside>
      <ContainerCustom padding={"md"}>
        <SwiperWithButtonTop<CharityT>
          id={"charity-slider"}
          title={"Благотворительность"}
          link={"/charity"}
          items={charity}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfCharity>
              <Charity.CharityCard {...param} />
            </CustomSwiper.SlideOfCharity>
          )}
        </SwiperWithButtonTop>
      </ContainerCustom>
      <ContainerCustom padding={"xsm"}>
        <CertificatesAndLicenses certificatesAndLicenses={company.certificatesAndLicenses} />
      </ContainerCustom>
      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <SwiperWithButtonTop<VacancyT>
          id={"vacancy-slider"}
          title={"Карьера в компании"}
          link={"/career"}
          items={vacancy}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfVacancy>
              <Link href={`career/${param.id}`}>
                <Career.Vacancy vacancy={param} detail />
              </Link>
            </CustomSwiper.SlideOfVacancy>
          )}
        </SwiperWithButtonTop>
      </ContainerCustom>
      <ContainerCustom padding={"sm"} paddingMb={"sm"}>
        <Career.SendResume />
      </ContainerCustom>
      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <Contacts contacts={company.contacts} />
      </ContainerCustom>
    </ContainerArticleCustom>
  );
}

CompanyPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/company" });
    const [articles, charity, vacancy] = await Promise.allSettled([
      getArticlesList({ isPopular: true }),
      getCharities(),
      getVacancy(),
    ]);
    const companyInfo = require("../../public/help/company.json");

    return {
      props: {
        articles: articles.status === "fulfilled" ? articles.value : [],
        company: companyInfo,
        charity: charity.status === "fulfilled" ? charity.value : [],
        vacancy: vacancy.status === "fulfilled" ? vacancy.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticleCustom = styled(ContainerArticle)`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) 375px;
  grid-column-gap: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  align-items: start;

  & > section {
    grid-column: 1;
  }

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
    margin-bottom: 20px;
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  display: grid;
  grid-row-gap: 20px;
  width: 100%;
  padding-top: 20px;

  @media (min-width: 1199px) {
    padding-top: 0;
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 3;
    position: sticky;
    top: 100px;
  }

  @include respond-to(small) {
    display: none;
    padding-top: 8px;
    grid-row-gap: 8px;
  }
`;

const ContainerContent = styled.section`
  @import "variables";

  display: grid;
  grid-row-gap: 40px;
  padding: 32px 40px 40px;
  border-radius: 40px;
  background: $white;
  color: $black;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;

  @include respond-to(small) {
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  height: auto;

  img {
    position: relative !important;
    height: unset !important;
  }
`;

const Paragraph = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
`;

const ContainerBlock = styled.div`
  display: grid;
  grid-row-gap: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "xsm" | "md";
  paddingMb?: "sm" | "md";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 20px;
  }
  &.padding-xsm {
    padding-top: 24px;
  }
  &.padding-md {
    padding-top: 44px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 12px;
    }
    &.paddingMb-md {
      padding-top: 24px;
    }
  }
`;
