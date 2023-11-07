import { ContainerArticle } from "common/components/Container";
import styled from "astroturf/react";
import { TitleH1 } from "../../common/components/TitleH1";
import { Accordion } from "../../common/components/Accordion";
import { GetServerSideProps } from "next";
import { getInitialData } from "../../common/hooks/useInitialData";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { getArticlesList } from "../../api/articlesApi";
import { Articles } from "../../modules/articles/components/Articles";
import { XSSProtection } from "../../modules/products/utils/XSSProtection";
import { AsideLinks } from "../../common/components/AsideLinks";
import { useState } from "react";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { FaqT } from "../../common/interfaces/faq";
import { getLayout } from "../../common/components/layout/Layout";

type Props = {
  articles: ArticleT[];
  faq: FaqT;
};

export default function PlaceAnOrderPage({ articles, faq }: Props) {
  const [active, setActive] = useState(faq.questions[0]);

  return (
    <ContainerArticleCustom>
      <ContainerContent>
        <TitleH1 title={faq.title} />
        <CustomSwiper
          arrowSettings={{ hidden: true }}
          sliderSettings={{ desktopSB: 8, mobileSB: 8 }}
          id={"faq-slider"}
          items={faq.questions}
        >
          {(param) => (
            <ContainerTag isActive={param.label === active.label} onClick={() => setActive(param)}>
              {param.label}
            </ContainerTag>
          )}
        </CustomSwiper>

        <Accordions>
          {active.options.map((el, i) => (
            <Accordion key={i} title={el.title}>
              <p
                dangerouslySetInnerHTML={{
                  __html: XSSProtection(el.descriptions.replace(/(\r\n|\r|\n)/g, "<br>")),
                }}
              />
            </Accordion>
          ))}
        </Accordions>
      </ContainerContent>
      <PositionAside>
        <AsideLinks
          activeLink={"faq"}
          links={["order", "pharmacy", "loyalty", "bring-friend", "faq"]}
        />
        <Articles.ArticlesPopular articles={articles} />
      </PositionAside>
    </ContainerArticleCustom>
  );
}

PlaceAnOrderPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/help/fag" });
    const faqInfo = require("../../../public/help/faq.json");

    const [articles] = await Promise.allSettled([getArticlesList({ isPopular: true })]);

    return {
      props: {
        articles: articles.status === "fulfilled" ? articles.value : [],
        faq: faqInfo,
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
    padding-top: 8px;
    grid-row-gap: 8px;
  }
`;

const ContainerContent = styled.div`
  @import "variables";

  padding: 32px 40px 40px;
  border-radius: 40px;
  background: $white;
  color: $black;
  font-weight: 500;
  font-size: 14px;
  line-height: 137%;
`;

const ContainerTag = styled.div<{ isActive: boolean }>`
  @import "variables";

  @include transition();

  cursor: pointer;
  margin: 16px 0 24px;
  padding: 15px 20px;
  border: 2px solid #edf0f3;
  border-radius: 16px;

  &:hover {
    border: 2px solid $blue1;
  }

  &.isActive {
    pointer-events: none;
    border: 2px solid $blue1;
  }
`;

const Accordions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;

  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
  }
`;
