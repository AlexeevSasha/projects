import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IStadiumHowToGet } from "../../src/api/dto/IStadiumHowToGet";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { coordinatesArray } from "../../src/componentPages/pageAcademy/contacts/coordinates";
import { HowToGetDropdownList } from "../../src/componentPages/pageStadium/howToGet/howToGetDropDownList";
import { YandexMap } from "../../src/componentPages/pageStadium/howToGet/yandexMap";
import { StadiumBanner } from "../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { GetLayout } from "../../src/components/layout/getLayout";

interface IProps {
  howToGet?: IStadiumHowToGet;
}

export default function HowToGet(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.howToGet?.mainInfo?.title, locale)}
        banner={
          getLocalValue(props.howToGet?.mainInfo?.previewImg, locale) || "/images/stadium/about/banner_v1.0.0.png"
        }
      />

      <MapContainer>
        <YandexMap coordinates={coordinatesArray} hasPointerContainer />
      </MapContainer>

      <HowToGetDropdownList howToGet={props.howToGet?.howToGet} />
    </>
  );
}

HowToGet.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "stadiumHowToGet" })).value[0];
  const howToGet = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: howToGet?.metaTags || (seodata as Record<string, any>)["/stadium/howToGet"] || null,
      howToGet,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const MapContainer = styled.div`
  width: 100%;
  margin-top: 2.07vw;
  margin-bottom: 3.88vw;
`;
