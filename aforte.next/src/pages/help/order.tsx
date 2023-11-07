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
import { OrderInfoT } from "../../common/interfaces/orderInfo";
import { getLayout } from "../../common/components/layout/Layout";

type Props = {
  articles: ArticleT[];
  orderInfo: OrderInfoT;
};

export default function PlaceAnOrderPage({ articles, orderInfo }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerContent>
        <ContainerItems>
          <TitleH1 title={"Как сделать заказ"} />
          <p
            dangerouslySetInnerHTML={{
              __html: XSSProtection(orderInfo.descriptions.replace(/(\r\n|\r|\n)/g, "<br>")),
            }}
          />
        </ContainerItems>

        {orderInfo.children?.map((el, i) => (
          <ContainerItems key={i}>
            <h4>{el.title}</h4>
            {el.smallDescriptions ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: XSSProtection(el.smallDescriptions.replace(/(\r\n|\r|\n)/g, "<br>")),
                }}
              />
            ) : null}
            {el.children ? (
              <Accordions>
                {el?.children.map((el, i) => (
                  <Accordion key={i} title={el.title}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: XSSProtection(el.descriptions.replace(/(\r\n|\r|\n)/g, "<br>")),
                      }}
                    />
                  </Accordion>
                ))}
              </Accordions>
            ) : null}
            <p
              dangerouslySetInnerHTML={{
                __html: XSSProtection(el.descriptions.replace(/(\r\n|\r|\n)/g, "<br>")),
              }}
            />
          </ContainerItems>
        ))}
      </ContainerContent>
      <PositionAside>
        <AsideLinks
          activeLink={"order"}
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
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/help/order" });
    const orderInfo = require("../../../public/help/order.json");

    const [articles] = await Promise.allSettled([getArticlesList({ isPopular: true })]);

    return {
      props: {
        orderInfo: orderInfo,
        articles: articles.status === "fulfilled" ? articles.value : [],
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

  display: grid;
  grid-row-gap: 40px;
  padding: 32px 40px 40px;
  border-radius: 40px;
  background: $white;
  color: $black;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;

  h4,
  p {
    margin: 0;
  }
`;

const ContainerItems = styled.div`
  display: grid;
  grid-row-gap: 20px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
  }
`;

const Accordions = styled.div`
  display: grid;
  grid-row-gap: 12px;
`;
