import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { GetLayout } from "../../../src/components/layout/getLayout";
import ServicesBanner from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../src/components/sendFormProposal/sendFormPropposal";
import { Tour } from "../../../src/components/tour/tour";
import { Spacer } from "../../../src/components/spacer";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  dataJSON: any;
}

export default function ExcursionTours(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <ServicesBanner
        withButton
        banner={getLocalValue(props.dataJSON.mainInfo.previewImg, locale)}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />
      <Spacer height={["2.08vw", "7.82vw", "5.33vw"]} />

      <Tour.RedBanner redBannerData={props.dataJSON.redBanner} />

      <Tour.StandardTourListPoint {...props.dataJSON.standardTour} />

      {props.dataJSON?.customTours?.map((elem: any, i: number) => (
        <Tour.AboutBlockImgText
          {...elem}
          key={`k${i}`}
          type={(i === 0 || i % 2 === 0) && i !== props.dataJSON?.customTours.length - 1 ? "left" : "right"}
        />
      ))}

      <Tour.Advertisement text={props.dataJSON.additional.text} img={props.dataJSON.additional.img} />

      <SendFormProposal
        feedbackType={"HallOfFame"}
        moreInformation
        title={lang[locale].form.getAConsultation}
        image={"/images/services/FameHallForm_v1.0.0.png"}
      />
    </>
  );
}

ExcursionTours.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "excursionTours" })).value[0];
  const dataJSON = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: dataJSON?.metaTags || (seodata as Record<string, any>)["/stadium/services/fameHall"] || null,
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
