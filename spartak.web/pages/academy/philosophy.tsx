import { GetStaticProps } from "next";
import React from "react";
import { Philosophy } from "../../src/componentPages/pageAcademy/philosophy/philosophy";
import { GetLayout } from "../../src/components/layout/getLayout";

interface IProps {
  dataJSON: Record<string, any>;
}

export default function PhilosophyPage({ dataJSON }: IProps) {
  return <Philosophy data={dataJSON.mainInfo} />;
}

PhilosophyPage.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../public/mockJSON/philosophy.json");

  return {
    props: { dataJSON, metaTags: dataJSON.metaTags },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
