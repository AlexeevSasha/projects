import { getVacancy, getVacancyById } from "api/careerApi";
import styled from "astroturf/react";
import { AsideLinks } from "common/components/AsideLinks";
import { ContainerArticle } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import { Career } from "modules/career/components/Career";
import { VacancyT } from "modules/career/interfaces/vacancy";
import { VacancyDetailT } from "modules/career/interfaces/vacancyDetail";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  vacancy: VacancyT[];
  vacancyDetail: VacancyDetailT;
};

export default function CareerPage({ vacancy, vacancyDetail }: Props) {
  return (
    <ContainerArticleCustom>
      <Conteiner>
        <Career.CareerDetail vacancyDetail={vacancyDetail} />
        <FormBlock>
          <Career.ResumeForm detail />
        </FormBlock>
      </Conteiner>
      <PositionAside>
        <AsideLinks
          activeLink={"career"}
          links={["about-company", "charity", "certificates", "career", "contact"]}
        />
        <AnotherVacancy>
          <AnotherVacancyTitle>Другие вакансии</AnotherVacancyTitle>
          {vacancy.slice(0, 2).map((element) => (
            <CustomLink href={`${element.id}`} key={element.id}>
              <Career.Vacancy vacancy={element} detail />
            </CustomLink>
          ))}
        </AnotherVacancy>
      </PositionAside>
    </ContainerArticleCustom>
  );
}

CareerPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/career" });
    const [vacancy, vacancyDetail] = await Promise.allSettled([
      getVacancy(),
      getVacancyById(query.id as string),
    ]);

    return {
      props: {
        vacancy: vacancy.status === "fulfilled" ? vacancy.value : [],
        vacancyDetail: vacancyDetail.status === "fulfilled" ? vacancyDetail.value : {},
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
    display: none;
  }
`;

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormBlock = styled.div`
  @import "variables";
  background: $white;
  border-radius: 40px;
  margin-top: 24px;
  @include respond-to(small) {
    margin-top: 12px;
    border-radius: 28px;
  }
`;

const AnotherVacancy = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnotherVacancyTitle = styled.div`
  @import "variables";
  background: $white;
  border-radius: 25.8064px;
  padding: 0 24px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;
  line-height: 0px;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const CustomLink = styled(Link)`
  margin-top: 12px;
`;
