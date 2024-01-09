import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { cmsRepository } from "../../../../src/api/cmsRepository";
import { IServicesVip } from "../../../../src/api/dto/IServicesVip";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { VipInfoBlock } from "../../../../src/componentPages/pageServices/infoBlock/vipInfoBlock";
import { AdditionalServices } from "../../../../src/componentPages/pageServices/vipLodges/additionalServices/additionalServices";
import { ExclusiveConditions } from "../../../../src/componentPages/pageServices/vipLodges/exclusiveConditions/exclusiveConditions";
import { PeriodOfUse } from "../../../../src/componentPages/pageServices/vipLodges/periodOfUse/periodOfUse";
import { PlanVipSection } from "../../../../src/componentPages/pageServices/vipLodges/planVipSection/planVipSection";
import { ServicesTriplePhoto } from "../../../../src/componentPages/pageServices/vipLodges/servicesTriplePhoto/servicesTriplePhoto";
import { StyledRedBanner } from "../../../../src/componentPages/pageServices/vipLodges/styledRedBanner/styledRedBanner";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";
import ServicesBanner from "../../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  vipInfo: IServicesVip;
}

export default function Vip(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <ServicesBanner
        withButton
        banner={getLocalValue(props.vipInfo?.mainInfo?.previewImg, locale) ?? null}
        title={getLocalValue(props.vipInfo?.mainInfo?.title, locale) || ""}
      />
      <StyledRedBanner redBanner={props.vipInfo?.redBanner} />
      <VipInfoBlock blockInfo={props.vipInfo?.blockInfo} />
      <PlanVipSection planImage={props.vipInfo?.planImage} />
      <ExclusiveConditions exclusiveConditions={props.vipInfo?.exclusiveConditions} />
      <PeriodOfUse />
      <AdditionalServices additionalServices={props.vipInfo?.additionalServices} />
      <ServicesTriplePhoto triplePhoto={props.vipInfo?.triplePhoto} />
      <SendFormProposal
        feedbackType={"VipHall"}
        description={lang[locale].pageVipLodge.sendFormProposal.titleDescription}
        title={lang[locale].pageVipLodge.rent.titleForm}
        image={"/images/services/PhotoForRental_v1.0.0.png"}
      />
    </>
  );
}

Vip.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "servicesVip" })).value[0];
  const vipInfo = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      vipInfo,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
