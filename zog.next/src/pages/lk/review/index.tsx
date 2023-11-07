import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IReview } from "../../../modules/review/interfaces/Review";
import { Layout } from "../../../modules/layout/components/layout";
import { Review } from "../../../modules/review/components/Review";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { useState } from "react";

interface IProps {
  reviews: IReview[];
}

export default function ReviewPage({ reviews }: IProps) {
  const { locale } = useRouter();
  const [reviewList, setReviewList] = useState<IReview[]>(reviews);

  const handlerDeleteReview = (id: string) => {
    setReviewList((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <>
      <Head>
        <title>Отзывы - Амрита</title>
        <meta name="description" content="Отзывы - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1 className={"mt-4 mb-4 text-2xl"}>{getLanguage(locale).review.all_review}</h1>
          <Review.ReviewTable reviews={reviewList} handlerDelete={handlerDeleteReview} />
        </div>
      </main>
    </>
  );
}

ReviewPage.getLayout = Layout.Auth;
ReviewPage.auth = true;

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/review/get`)
    .then((response) => response.data.data);

  return {
    props: { reviews: reviews || [] },
  };
};
