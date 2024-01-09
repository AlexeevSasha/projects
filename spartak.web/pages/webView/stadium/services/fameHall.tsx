import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";
import ServicesBanner from "../../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../../src/components/sendFormProposal/sendFormPropposal";
import { Tour } from "../../../../src/components/tour/tour";
import { useWindowSize } from "../../../../src/core/hooks/UseWindowSize";

interface IProps {
  dataJSON: any;
}

export default function FameHall(props: IProps) {
  const { locale = "ru" } = useRouter();
  const { width = 0 } = useWindowSize(true);

  return (
    <>
      <ServicesBanner
        withButton
        banner={props.dataJSON.mainInfo.img[width < 768 ? 2 : width >= 768 && width <= 1199 ? 1 : 0]}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />

      <Tour.RedBanner redBannerData={props.dataJSON.redBanner} />

      <Tour.StandardTourListPoint {...props.dataJSON.packagesData} />

      {props.dataJSON?.infoBlock?.map((elem: any, i: number) => (
        <Tour.AboutBlockImgText {...elem} key={`k${i}`} />
      ))}

      <Tour.Advertisement text={props.dataJSON.banner.text} img={props.dataJSON.banner.img} />

      <SendFormProposal
        feedbackType={"HallOfFame"}
        moreInformation
        title={lang[locale].form.getAConsultation}
        image={"/images/services/FameHallForm_v1.0.0.png"}
      />
    </>
  );
}

FameHall.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../../public/mockJSON/fameHall.json");

  return {
    props: {
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
