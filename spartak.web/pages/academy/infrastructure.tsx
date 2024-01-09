import { GetStaticProps } from "next";
import React from "react";
import { AcademyLayout } from "../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { Infrastructure } from "../../src/componentPages/pageAcademy/infrastructure/infrastructure";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IAcademyInfrastructure } from "../../src/api/dto/IAcademyInfrastructure";

type Props = {
  infrastructure: IAcademyInfrastructure;
};

export default function InfrastructurePage({ infrastructure }: Props) {
  return <Infrastructure infrastructure={infrastructure} />;
}

InfrastructurePage.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "academyInfrastructure" })).value[0];
  let infrastructure;
  try {
    infrastructure = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      title: infrastructure?.mainInfo?.title || "infrastructure",
      previewImg: infrastructure?.mainInfo?.previewImg,
      metaTags: infrastructure?.metaTags || null,
      infrastructure,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
