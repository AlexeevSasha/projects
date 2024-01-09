import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { SelectFields } from "../../../src/componentPages/pagesMore/selectFirlds/SelectFields";
import { GetLayout } from "../../../src/components/layout/getLayout";

export default function Select() {
  return <SelectFields />;
}

Select.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    metaTags: (seodata as Record<string, any>)["/more/sokolniki/select"] || null,
  },
  revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
});
