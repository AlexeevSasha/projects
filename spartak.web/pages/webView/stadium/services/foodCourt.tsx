import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { lang } from "../../../../public/locales/lang";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { FoodCourtAboutBlock } from "../../../../src/componentPages/pageServices/foodCourt/foodCourtAboutBlock/foodCourtAboutBlock";
import { FoodCourtBlockTriplePhoto } from "../../../../src/componentPages/pageServices/foodCourt/foodCourtBlockTriplePhoto/foodCourtBlockTriplePhoto";
import { FoodCourtRedBanner } from "../../../../src/componentPages/pageServices/foodCourt/foodCourtRedBanner/foodCourtRedBanner";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";
import ServicesBanner from "../../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  dataJSON: any;
}

export default function FoodCourt(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <ServicesBanner
        withButton
        banner={getLocalValue(props.dataJSON.mainInfo.img, locale)}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />
      <FoodCourtRedBanner bannerData={props.dataJSON.redBanner} />
      <FoodCourtAboutBlock listSectorInfo={props.dataJSON.infoBlock} />
      <FoodCourtBlockTriplePhoto />
      <SendFormProposal
        feedbackType={"FoodCourt"}
        title={lang[locale].form.contactTheManager}
        image={"/images/services/RedChairs_v1.0.0.png"}
      />
    </>
  );
}

FoodCourt.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../../public/mockJSON/foodCourt.json");

  return {
    props: {
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
