import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { lang } from "../../../../public/locales/lang";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { ChildrenAreaAboutBlock } from "../../../../src/componentPages/pageServices/childrenArea/childrenAreaAboutBlock/childrenAreaAboutBlock";
import { ChildrenAreaBlockTriplePhoto } from "../../../../src/componentPages/pageServices/childrenArea/childrenAreaBlockTriplePhoto/childrenAreaBlockTriplePhoto";
import { ChildrenAreaRedBanner } from "../../../../src/componentPages/pageServices/childrenArea/childrenAreaRedBanner/childrenAreaRedBanner";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";
import ServicesBanner from "../../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  dataJSON: any;
}

export default function ChildrenArea(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <ServicesBanner
        withButton
        banner={getLocalValue(props.dataJSON.mainInfo.img, locale)}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />
      <ChildrenAreaRedBanner redBannerData={props.dataJSON.redBanner} />
      <ChildrenAreaAboutBlock listSectorInfo={props.dataJSON.infoBlock} />
      <ChildrenAreaBlockTriplePhoto />

      <SendFormProposal
        feedbackType={"ChildrenHall"}
        title={lang[locale].form.contactTheManager}
        image={"/images/services/ChildrenAreaSendFormPhoto_v1.0.0.png"}
      />
    </>
  );
}

ChildrenArea.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../../public/mockJSON/childrenArea.json");

  return {
    props: {
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
