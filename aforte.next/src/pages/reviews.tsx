import { getLayout } from "../common/components/layout/Layout";
import { GetServerSideProps } from "next";
import styled from "astroturf/react";
import { ContainerArticle } from "../common/components/Container";
import { getInitialData } from "../common/hooks/useInitialData";
import { TitleH1 } from "../common/components/TitleH1";
import { Filters } from "../modules/filters/components/Filters";
import { Reviews } from "../modules/reviews/components/Reviews";
import { StoryAllReviewsT } from "../modules/reviews/interfaces/reviews";
import { getAllStoryReviews } from "../api/reviewsApi";
import { wordDeclension } from "../common/utils/wordDeclension";

type Props = {
  reviews: StoryAllReviewsT;
};

export default function CharityDetailsPage({ reviews }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerTitle>
        <TitleH1
          title={"Отзывы о магазине"}
          smallText={`${reviews.reviews.length} ${wordDeclension(reviews.reviews.length, [
            "отзыв",
            "отзыва",
            "отзывов",
          ])}`}
        />
        <Filters.Sorting positions={"right"} noneTitleMobile />
      </ContainerTitle>
      <ContainerCustom padding={"sm"} paddingMb={"sm"}>
        <Reviews.StoryReviewsContainer reviews={reviews.reviews} />
      </ContainerCustom>
      <PositionAside>
        <Reviews.RatingList ratings={reviews.ratings} />
      </PositionAside>
    </ContainerArticleCustom>
  );
}

CharityDetailsPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/reviews" });
    const [reviews] = await Promise.allSettled([getAllStoryReviews()]);

    return {
      props: {
        reviews: reviews.status === "fulfilled" ? reviews.value : {},
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
  }

  @include respond-to(small) {
    margin-bottom: 36px;
    margin-top: 8px;
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

const ContainerTitle = styled.section`
  @import "variables";

  display: flex;
  justify-content: space-between;
  align-items: center;

  @include respond-to(small) {
    align-items: start;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "sm";
  paddingMb?: "sm";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 24px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 16px;
    }
  }
`;
