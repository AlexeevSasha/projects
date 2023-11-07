import { Container } from "common/components/Container";
import { MetaCatalogue } from "../../modules/metacatalogue/components/MetaCatalogue";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { getLayout } from "../../common/components/layout/Layout";
import { TitleH1 } from "../../common/components/TitleH1";
import { GetServerSideProps } from "next";
import { getInitialData } from "../../common/hooks/useInitialData";
import { getCategoryMetaCatalogue, getAlphabetSearchResult } from "../../api/metaCatalogueApi";
import { AlphabetSearchResultT } from "../../modules/metacatalogue/interfaces/metaCatalogue";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";
import styled from "astroturf/react";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Справочник ", link: "/" },
];

type Props = {
  alphabetSearchResult: AlphabetSearchResultT[];
  category: CategoryButtonT[];
};

export default function MetaCataloguePage(props: Props) {
  return (
    <ContainerArticle>
      <CustomContainer padding={"md"} paddingMB={"md"}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <TitleH1 title={"Поиск по алфавиту"} />
      </CustomContainer>
      <CustomContainer padding={"sm"} paddingMB={"md"}>
        <MetaCatalogue.AlphabeticalSearch category={props.category} />
      </CustomContainer>
      <CustomContainer padding={"md"} paddingMB={"sm"}>
        <MetaCatalogue.AlphabetResult metaCatalogue={props.alphabetSearchResult} />
      </CustomContainer>
    </ContainerArticle>
  );
}

MetaCataloguePage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, mainCategories } = await getInitialData({ pathname: "/product" });
    const [alphabetSearchResult, category] = await Promise.allSettled([
      getAlphabetSearchResult(),
      getCategoryMetaCatalogue(),
    ]);

    return {
      props: {
        alphabetSearchResult:
          alphabetSearchResult.status === "fulfilled" ? alphabetSearchResult.value : [],
        category: category.status === "fulfilled" ? category.value : [],
        initialData: { metaTags, mainCategories },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticle = styled.article`
  @import "variables";

  margin-bottom: 60px;

  @include respond-to(small) {
    margin-bottom: 16px;
  }
`;

const CustomContainer = styled(Container)<{
  padding?: "sm" | "md" | "lg";
  paddingMB?: "sm" | "md" | "lg";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 16px;
  }

  &.padding-md {
    padding-top: 20px;
  }

  @include respond-to(small) {
    &.paddingMB-sm {
      padding-top: 8px;
    }

    &.paddingMB-md {
      padding-top: 12px;
    }
  }
`;
