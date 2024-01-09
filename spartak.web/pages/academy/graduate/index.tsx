import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { GraduateSectionEntity } from "../../../src/api/dto/GraduateSecion";
import { graduateSectionRepository } from "../../../src/api/graduateSectionRepository";
import { AcademyLayout } from "../../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { GraduateSections } from "../../../src/componentPages/pageAcademy/graduate/graduateSections";

type Props = {
  sections: GraduateSectionEntity[];
};

export default function GraduateSectionsPage({ sections }: Props) {
  return <GraduateSections sections={sections} />;
}

GraduateSectionsPage.getLayout = AcademyLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async () => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/academy/graduate", new Date());

  const sections =
    (
      await graduateSectionRepository.fetchGraduateSections({
        Status: "Published",
        sorting: "SortOrder asc",
      })
    ).value || [];

  isDev && console.log("\x1b[34m", "done", "/academy/graduate", new Date(), "\r\n");

  return {
    props: {
      title: (seodata as Record<string, any>)["/academy/graduate"].h1 || "graduate",
      metaTags: (seodata as Record<string, any>)["/academy/graduate"] || null,
      sections,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
