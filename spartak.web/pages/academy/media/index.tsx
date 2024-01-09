import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICategory } from "../../../src/api/dto/ICategory";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { AcademyLayout } from "../../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { MediaNav } from "../../../src/componentPages/pageAcademy/media/mediaNav";
import { MediaList } from "../../../src/components/mediaList";

interface IProps {
  // categoryList: ICategory[];
  year: number;
  month: number;
}

export default function Media({ year, month }: IProps) {
  const { query, replace } = useRouter();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    (query.month !== `${month}` || query.year !== `${year}` || query.category == undefined) &&
      replace({ query: `mediaType=All&month=${month}&year=${year}&category=${query.category || 0}` }, undefined, {
        shallow: true,
      });
  }, []);

  // При изменении query запрашивать список категорий
  useEffect(() => {
    mediaRepository
      .fetchMediaCategories({
        section: "Academy",
        mediaType: query.mediaType === "All" ? "None" : String(query.mediaType),
      })
      .then((res) => {
        setCategoryList(res);
      });
  }, [query]);

  return (
    <>
      <MediaNav categoryList={categoryList} />
      <MediaList section="Academy" />
    </>
  );
}

Media.getLayout = AcademyLayout;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  res.setHeader("Cache-Control", `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE}, stale-while-revalidate=59`);

  // const categoryRes = await mediaRepository.fetchMediaCategories({
  //   section: "Academy",
  //   mediaType: query.mediaType === "All" ? "None" : String(query.mediaType),
  // });

  // Если в query параметрах не указан id, то получает первую команду как активную
  const date = new Date();
  const year = Number(query.year || date.getFullYear());
  const month = Number(query.month || date.getMonth());

  return {
    props: {
      year,
      month,
      // categoryList: categoryRes || [],
    },
  };
};
