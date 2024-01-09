import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { IAcademyContacts } from "../../src/api/dto/IAcademyContacts";
import { AcademyLayout } from "../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { HowToMoveAcademy } from "../../src/componentPages/pageAcademy/contacts/academyContacts";

interface IProps {
  dataJSON: IAcademyContacts;
}

export default function HowMoveAcademy(props: IProps) {
  return <HowToMoveAcademy dataJSON={props.dataJSON.infoBlocks} />;
}

HowMoveAcademy.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../public/mockJSON/academyContacts.json");

  return {
    props: {
      title: (seodata as Record<string, any>)["/academy/contacts"].h1 || dataJSON.mainInfo.title,
      metaTags: (seodata as Record<string, any>)["/academy/contacts"] || dataJSON.metaTags || null,
      banner: dataJSON.mainInfo.img,
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
