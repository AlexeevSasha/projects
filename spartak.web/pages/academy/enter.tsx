import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IAcademyEnter } from "../../src/api/dto/IAcademyEnter";
import { theme } from "../../src/assets/theme/theme";
import { AcademyLayout } from "../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { EnterConditions } from "../../src/componentPages/pageAcademy/enter/enterConditions";
import { BottomBanner } from "../../src/componentPages/pageMain/bottomBanner/bottomBanner";

interface IProps {
  enterData: IAcademyEnter;
}

export default function EnterAcademy(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <Content>
        <EnterConditions enterData={props.enterData} />
      </Content>
      <StyledBottomBanner>
        <BottomBanner
          academy
          title={lang[locale].academy.enter.bannerTitle}
          text={lang[locale].academy.enter.bannerText}
          img={"/images/banners/bgAcademyL_v1.0.0.png"}
        />
      </StyledBottomBanner>
    </>
  );
}

EnterAcademy.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "academyEnter" })).value[0];
  const enterData = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: enterData?.metaTags || (seodata as Record<string, any>)["/academy/enter"] || null,
      title: enterData?.mainInfo.title || (seodata as Record<string, any>)["/academy/enter"].h1,
      banner: enterData?.mainInfo.previewImg || null,
      enterData,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.17vw 8.75vw;
  color: ${({ theme }) => theme.colors.white_black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 4.27vw;
  }
`;
const StyledBottomBanner = styled.div`
  & > article {
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 46.55vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 97.7vw;
    }
  }
`;
