import Head from "next/head";
import Link from "next/link";
import { Review } from "../modules/review/components/Review";
import { useRouter } from "next/router";
import { getLanguage } from "../../public/locales/lang";

export default function ReviewPage() {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <>
      <Head>
        <title>Оставить отзыв</title>
        <meta name="description" content="Амрита - Оставить отзыв" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"relative flex flex-col items-center justify-center p-4"}>
        <Link
          className={
            "absolute top-5  left-5 rounded-lg bg-blue-500 p-2 text-white duration-200 hover:bg-blue-700"
          }
          href={"/lk"}
        >
          {lang.common.personal_cabinet}
        </Link>
        <h1 className={"mt-16 text-3xl font-bold"}>{lang.review.leave_review}</h1>
        <div className={"mt-8 w-full max-w-6xl rounded-lg bg-white p-4"}>
          <Review.ReviewForm />
        </div>
      </main>
    </>
  );
}
