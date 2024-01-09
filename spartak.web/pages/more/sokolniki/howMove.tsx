import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { HowToMoveSokolniki } from "../../../src/componentPages/pagesMore/howMove/howToMoveSocolniki";
import { GetLayout } from "../../../src/components/layout/getLayout";

export default function HowMove() {
  return <HowToMoveSokolniki />;
}

HowMove.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    metaTags: (seodata as Record<string, any>)["/more/sokolniki/howMove"] || null,
  },
  revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
});
