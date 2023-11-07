import { getVacancy } from "api/careerApi";
import styled from "astroturf/react";
import { AsideLinks } from "common/components/AsideLinks";
import { Button } from "common/components/Button";
import { ContainerArticle } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import { NextImage } from "common/components/NextImage";
import { TitleH1 } from "common/components/TitleH1";
import { Career } from "modules/career/components/Career";
import { VacancyT } from "modules/career/interfaces/vacancy";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  vacancy: VacancyT[];
};

export default function CareerPage({ vacancy }: Props) {
  const vacancyType = vacancy.map((el) => el.type);
  const uniqueVacancy = Array.from(new Set(vacancyType));
  const [filter, setFilter] = useState("");
  const [sortingVacancy, setSortingVacancy] = useState<VacancyT[]>(vacancy);

  useEffect(() => {
    if (filter) {
      setSortingVacancy(vacancy.filter((element) => element.type === filter));
    } else {
      setSortingVacancy(vacancy);
    }
  }, [filter]);

  return (
    <ContainerArticleCustom>
      {vacancy.length ? (
        <Conteiner>
          <HeaderContainer>
            <TitleBlock>
              <TitleH1 title="Карьера в компании" />
              <CareerCount>{sortingVacancy.length} вакансий</CareerCount>
            </TitleBlock>
            <FilterBlock>
              {uniqueVacancy.map((element) => (
                <Filter
                  typeBtn={"blueWhite"}
                  key={element}
                  onClick={() => setFilter((prev) => (prev === element ? "" : element))}
                  activeFilter={element === filter}
                >
                  {element}
                </Filter>
              ))}
            </FilterBlock>
          </HeaderContainer>
          <VacancyConteiner>
            {sortingVacancy.map((element) => (
              <CustomLink href={`career/${element.id}`} key={element.id}>
                <Career.Vacancy vacancy={element} />
              </CustomLink>
            ))}
          </VacancyConteiner>
        </Conteiner>
      ) : (
        <VacancyZeroLengthBlock>
          <ImageContainer>
            <NextImage src={"/images/empty.png"} alt={"empty"} />
          </ImageContainer>
          <VacancyZeroTitle>Вакансий нет</VacancyZeroTitle>
          <VacancyZeroText>
            Попробуйте заглянуть позже или отправьте ваше резюме, чтобы мы связались с вами, если
            появится подходящая вакансия.
          </VacancyZeroText>
        </VacancyZeroLengthBlock>
      )}
      <PositionAside>
        <AsideLinks
          activeLink={"career"}
          links={["about-company", "charity", "certificates", "career", "contact"]}
        />
        <Career.NotVacancy />
      </PositionAside>
    </ContainerArticleCustom>
  );
}

CareerPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/career" });
    const [vacancy] = await Promise.allSettled([getVacancy()]);

    return {
      props: {
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
  margin-top: 28px;
  margin-bottom: 40px;
  align-items: start;

  @include respond-to(medium) {
    grid-template-columns: minmax(300px, 1fr);
    margin-bottom: 20px;
    margin-top: 12px;
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  display: grid;
  grid-row-gap: 16px;
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
    padding-top: 0;
    grid-row-gap: 8px;
    div:first-child {
      display: none;
    }
  }
`;

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @include respond-to(small) {
    flex-direction: column;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const CareerCount = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 15px;
  line-height: 137%;
  opacity: 0.3;
  margin-left: 6px;
  @include respond-to(small) {
    margin-left: 2px;
  }
`;

const FilterBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  :last-child {
    margin-right: 0px;
  }
  @include respond-to(small) {
    margin-top: 12px;
  }
`;

const Filter = styled(Button) <{ activeFilter?: boolean }>`
  @import "variables";
  padding: 12px 20px;
  margin-right: 8px;
  font-size: 13px;
  &.activeFilter {
    background: $blue1;
    color: $white;
    &:hover {
      background: $blue2;
    }
  }
  @include respond-to(small) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const VacancyConteiner = styled.div`
  @import "variables";
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  :last-child {
    margin-bottom: 0px;
  }
  @include respond-to(small) {
    margin: 8px 0 20px 0;
  }
`;

const CustomLink = styled(Link)`
  margin-bottom: 8px;
`;

const VacancyZeroLengthBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 230px;
  margin: 88px 0 100px 0;
  @include respond-to(small) {
    margin: 56px 0 52px 0;
    padding: 0 20px;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  width: 220px;
  height: 220px;

  @include respond-to(small) {
    width: 180px;
    height: 180px;
  }
`;

const VacancyZeroTitle = styled.p`
  @import "variables";
  margin: 32px 0 0 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  @include respond-to(small) {
    margin: 12px 0 0 0;
    font-weight: 600;
    font-size: 20px;
    line-height: 137%;
  }
`;

const VacancyZeroText = styled.span`
  @import "variables";
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  @include respond-to(small) {
    margin-top: 16px;
    font-size: 13px;
    line-height: 20px;
  }
`;
