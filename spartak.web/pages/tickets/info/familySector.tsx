import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { IFamilySector } from "../../../src/api/dto/IFamilySector";
import { CMS } from "../../../src/modules/cms/components/cms";
import { NextImage } from "../../../src/ui/nextImage/nextImage";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../src/assets/theme/theme";

interface IProps {
  familySector: IFamilySector;
}

export default function FamilySector({ familySector }: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <MainBannerWithTitle
        withButton
        title={getLocalValue(familySector?.mainInfo?.title, locale)}
        banner={getLocalValue(familySector?.mainInfo?.previewImg, locale)}
      />
      <CMS.TextOnRedBackground info={familySector?.redBanner} />

      <ContainerContent>
        <StyledPlan>
          <NextImage src={getLocalValue(familySector.sectorPlane, locale)} />
        </StyledPlan>
      </ContainerContent>

      <CMS.ImgWithWysiwygInline info={familySector?.imgWithWysiwygInline || []} />
    </>
  );
}
FamilySector.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "ticketsFamilySector" })).value[0];
  let familySector;
  try {
    familySector = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      metaTags: familySector?.metaTags || null,
      familySector,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledPlan = styled.section`
  height: 367px;
  width: 100%;
  margin: 0 12.5vw 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 30.64vw;
    margin: 0 0 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 29.87vw;
    margin-bottom: 10.67vw;
  }
`;
