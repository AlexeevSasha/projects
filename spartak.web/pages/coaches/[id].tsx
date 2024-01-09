import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { coachesRepository } from "../../src/api/coachesRepository";
import { Coach, CoachPageProps } from "../../src/componentPages/pageAcademy/coaches/coach";
import { GetLayout } from "../../src/components/layout/getLayout";
import { metaInterpolate } from "../../src/helpers/metaInterpolate";

export default function GraduatesPage(props: CoachPageProps) {
  return <Coach {...props} section="site" />;
}

GraduatesPage.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/coaches/[id]", new Date());
  const metaTags = (seodata as Record<string, any>)["/coaches/[id]"] || null;

  const coach =
    (
      await coachesRepository.fetchCoaches({
        Id: params?.id && String(params.id),
        Status: "Published",
      })
    ).value[0] || null;

  const otherCoaches = (
    await coachesRepository.fetchCoaches({
      coachSection: "Site",
      Status: "Published",
      sorting: "SortOrder asc",
    })
  ).value;

  isDev && console.log("\x1b[34m", "done", "/coaches/[id]", new Date(), "\r\n");

  return {
    props: {
      coach,
      otherCoaches,
      metaTags: coach ? metaInterpolate(metaTags, coach.FullName) : null,
      title: coach ? metaInterpolate(metaTags, coach.FullName).h1 : null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
