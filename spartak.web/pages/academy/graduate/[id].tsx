import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { GraduateEntity } from "../../../src/api/dto/Graduate";
import { GraduateSectionEntity } from "../../../src/api/dto/GraduateSecion";
import { graduateRepository } from "../../../src/api/graduateRepository";
import { graduateSectionRepository } from "../../../src/api/graduateSectionRepository";
import { Graduates } from "../../../src/componentPages/pageAcademy/graduate/graduates";
import { GetLayout } from "../../../src/components/layout/getLayout";

interface IProps {
  graduates: GraduateEntity[];
  section: GraduateSectionEntity;
}

export default function GraduatesPage({ graduates = [], section }: IProps) {
  return <Graduates graduates={graduates} section={section} />;
}

GraduatesPage.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/academy/graduate/[id]", new Date());

  const graduates = params?.id
    ? (await graduateRepository.fetchGraduates({ Status: "Published", GraduateSectionId: String(params?.id) })).value
    : [];
  const section =
    (
      await graduateSectionRepository.fetchGraduateSections({
        Status: "Published",
        sorting: "SortOrder asc",
        Id: String(params?.id),
      })
    ).value[0] || {};

  isDev && console.log("\x1b[34m", "done", "/academy/graduate/[id]", new Date(), "\r\n");

  return {
    props: { graduates, section },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
