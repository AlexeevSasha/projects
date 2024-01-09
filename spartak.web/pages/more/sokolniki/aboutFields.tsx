import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { AboutFields } from "../../../src/componentPages/pagesMore/aboutFields/AboutFields";
import { GetLayout } from "../../../src/components/layout/getLayout";

export default function Sokolniki() {
  return <AboutFields />;
}

Sokolniki.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    metaTags: (seodata as Record<string, any>)["/more/sokolniki/aboutFields"] || null,
  },
  revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
});
