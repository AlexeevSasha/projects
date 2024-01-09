import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import seodata from "../../../public/seo/seoData.json";
import { specialOffersRepository } from "../../../src/api/specialOffers";
import { formatDate, getYearsOld, toISOString } from "../../../src/assets/constants/date";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { Quiz } from "../../../src/componentPages/quiz/components/quiz";
import { IQuiz } from "../../../src/componentPages/quiz/interfaces/IQuiz";
import { UseWinlineModal } from "../../../src/componentPages/voting/useWinlineModal";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { DataContext } from "../../../src/core/dataProvider";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { getCookie } from "../../../src/assets/constants/getCookie";

export default function QuizPage() {
  const { locale = "ru", query, push, asPath } = useRouter();
  const { loading, setLoading, auth: { user = undefined } = {} } = useContext(DataContext);

  const [useWinlineModalIsOpen, setUseWinlineModalIsOpen] = useState(false);
  const birthDate = user?.personalData.BirthDate || toISOString(new Date());

  const [quiz, setQuiz] = useState<IQuiz>();
  const [isStarting, setIsStarting] = useState(false);

  const fetchSpecialOffer = () => {
    setLoading(true);
    if (user) {
      specialOffersRepository
        .fetchQuiz(String(query?.id))
        .then((res) => {
          setQuiz(res);
          setIsStarting(!!res.ClientQuizStatistic);
        })
        .catch(() => push("/404"))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const startingQuiz = () => {
    // Если пользователю меньше 18 или он не дал согласия на получение акций, то открывается попап
    if (getYearsOld(birthDate) < 18 || !user?.AllowToUseWinline) {
      setUseWinlineModalIsOpen(true);
    } else {
      setIsStarting(true);
    }
  };

  useEffect(() => {
    if (!getCookie("refresh_token")) push(`/auth/signin?backUrl=${asPath}`);

    return () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    fetchSpecialOffer();
  }, [query?.id, user]);

  return (
    !loading && (
      <>
        <Quiz.Container>
          <section>
            <Quiz.Title>{getLocalValue(quiz?.Header, locale)}</Quiz.Title>
            <Quiz.Date
              EndPublish={formatDate(quiz?.EndPublish, "dd.MM.yyyy", locale)}
              StartPublish={formatDate(quiz?.StartPublish, "dd.MM.yyyy", locale)}
            />
            <Quiz.Description dangerouslySetInnerHTML={{ __html: getLocalValue(quiz?.Text, locale) }} />
            {isStarting ? null : <Quiz.Button onClick={startingQuiz} />}
          </section>
          {isStarting ? <Quiz.Questions statistic={quiz?.ClientQuizStatistic} quizId={quiz?.Id || ""} /> : null}
        </Quiz.Container>

        {useWinlineModalIsOpen && (
          <UseWinlineModal
            birthDate={birthDate}
            onClose={() => {
              setUseWinlineModalIsOpen(false);
              push("/profile/personalData");
            }}
            onConfirm={() => {
              setUseWinlineModalIsOpen(false);
              startingQuiz();
            }}
          />
        )}
      </>
    )
  );
}

QuizPage.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  const metaTags = metaInterpolate((seodata as Record<string, any>)["/profile/quiz/[id]"]);

  return {
    props: { metaTags },
  };
};
