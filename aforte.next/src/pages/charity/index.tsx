import { GetServerSideProps } from "next";
import styled from "astroturf/react";
import { AsideLinks } from "../../common/components/AsideLinks";
import { getLayout } from "../../common/components/layout/Layout";
import { getInitialData } from "../../common/hooks/useInitialData";
import { ContainerArticle } from "../../common/components/Container";
import { TitleH1 } from "../../common/components/TitleH1";
import { CharityT } from "../../modules/charity/interfaces/charity";
import { getCharities, getCharitiesFilter } from "../../api/charityApi";
import { Charity } from "../../modules/charity/components/Charity";
import { ListOfCategoryButtons } from "../../common/components/listOfCategoryButtons/ListOfCategoryButtons";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";

type Props = {
  charity: CharityT[];
  charityFilters: CategoryButtonT[];
};

export default function CharityPage({ charity, charityFilters }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerTitle>
        <TitleH1 title={"Благотворительность"} />
        <ListOfCategoryButtons categoriesList={charityFilters} />
      </ContainerTitle>
      <ContainerGrid>
        {charity?.map((el) => (
          <Charity.CharityCard key={el.id} {...el} />
        ))}
      </ContainerGrid>
      <PositionAside>
        <AsideLinks
          activeLink={"charity"}
          links={["about-company", "charity", "certificates", "career", "contact"]}
        />
      </PositionAside>
    </ContainerArticleCustom>
  );
}

CharityPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/charity" });
    const [charity, charityFilters] = await Promise.allSettled([
      getCharities(),
      getCharitiesFilter(),
    ]);

    return {
      props: {
        initialData: { metaTags, ...initialData },
        charity: charity.status === "fulfilled" ? charity.value : [],
        charityFilters: charityFilters.status === "fulfilled" ? charityFilters.value : [],
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
  margin-bottom: 40px;
  padding-top: 20px;
  align-items: start;

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
    margin-bottom: 36px;
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

const ContainerGrid = styled.section`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-top: 24px;
  height: 100%;
  grid-column: 1;

  @include respond-to(small) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-row-gap: 12px;
    margin-top: 10px;
  }
`;

const ContainerTitle = styled.section`
  @import "variables";

  grid-column: 1;
  display: flex;
  justify-content: space-between;

  & > div:last-child {
    margin-left: 8px;
  }

  @include respond-to(small) {
    flex-direction: column;

    h1 {
      margin-left: 8px;
    }

    & > div:last-child {
      margin-left: 0;
      margin-top: 12px;
    }
  }
`;
