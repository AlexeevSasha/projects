import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { ConferenceAboutBlock } from "../../../src/componentPages/pageServices/conferenceHall/conferenceInfoBlock/conferenceInfoBlock";
import { ConferenceList } from "../../../src/componentPages/pageServices/conferenceHall/conferenceList/conferenceList";
import { ConferenceRedBanner } from "../../../src/componentPages/pageServices/conferenceHall/conferenceRedBanner/conferenceRedBanner";
import { BlockTriplePhoto } from "../../../src/components/blockTriplePhoto/blockTriplePhoto";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  dataJSON: any;
}

export default function ConferenceHall(props: IProps) {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <>
      <MainBannerWithTitle
        withButton
        banner={getLocalValue(props.dataJSON.mainInfo.img, locale)}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />
      <ConferenceRedBanner bannerData={props.dataJSON.redBanner} />
      <ConferenceAboutBlock listSectorInfo={props.dataJSON.infoBlock} />
      <SendFormProposal
        feedbackType={"ConferenceHall"}
        title={t.form.contactTheManager}
        image={"/images/services/ConferenceHallFormPhoto_v1.0.0.png"}
      />
      <Container>
        <BlockTriplePhoto
          first={"/images/services/ConferenceHallTriple1_v1.0.0.png"}
          second={"/images/services/ConferenceHallTriple2_v1.0.0.png"}
          main={"/images/services/ConferenceHallTriple3_v1.0.0.png"}
        />
      </Container>

      <ConferenceList listData={props.dataJSON.listData} />
    </>
  );
}

ConferenceHall.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../public/mockJSON/conferenceHall.json");

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/stadium/services/conferenceHall"] || null,
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
const Container = styled(ContainerContent)`
  section:first-of-type {
    direction: rtl;
  }
`;
