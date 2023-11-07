import { Layout } from "../../../modules/layout/components/layout";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IReview } from "../../../modules/review/interfaces/Review";
import Head from "next/head";
import { Review } from "../../../modules/review/components/Review";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  review: IReview;
}

export default function ReviewIdPage({ review }: IProps) {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>Детальная страница отзывы - Амрита</title>
        <meta name="description" content="Детальная страница отзывы - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={"mt-4 mb-8 text-2xl"}>{getLanguage(locale).review.detailed_review}</h1>
        <Review.ReviewDetails review={review} />
      </main>
    </>
  );
}

ReviewIdPage.getLayout = Layout.Auth;
ReviewIdPage.auth = {
  roles: ["Admin"],
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const review = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/review/getById?id=${params?.id || ""}`)
    .then((response) => response.data.data);

  return {
    props: { review },
  };
};
