import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { IInvalidPlaces } from "../../../src/api/dto/IInvalidPlaces";
import styled from "styled-components";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { theme } from "../../../src/assets/theme/theme";

interface IProps {
  invalidPlaces: IInvalidPlaces;
}

export default function InvalidPlaces({ invalidPlaces }: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <MainBannerWithTitle
        title={getLocalValue(invalidPlaces?.mainInfo?.title, locale)}
        banner={getLocalValue(invalidPlaces?.mainInfo?.previewImg, locale)}
      />

      <DescriptionContainer>
        <Description dangerouslySetInnerHTML={{ __html: getLocalValue(invalidPlaces?.description, locale) }} />
      </DescriptionContainer>
    </>
  );
}
InvalidPlaces.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "ticketsInvalidPlaces" })).value[0];
  let invalidPlaces;
  try {
    invalidPlaces = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      metaTags: invalidPlaces?.metaTags || null,
      invalidPlaces,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const DescriptionContainer = styled(ContainerContent)`
  flex-direction: column;
  align-items: start;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 2.08vw 0 7.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;

const Description = styled.div`
  margin: 0;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-right: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }

  p {
    color: ${({ theme }) => theme.colors.grayLight_grayDark};
  }

  strong {
    margin: 0;
    font-weight: 700;
    padding-bottom: 1.61vw;
    font-size: 1.67vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-bottom: 3.13vw;
      font-size: 4.17vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-bottom: 6.4vw;
      font-size: 8.53vw;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    row-gap: 0.42vw;

    li {
      display: flex;
      align-items: center;
      gap: 0.63vw;
      list-style: none;
      font-family: Roboto, sans-serif;
      font-size: 1.25vw;

      :before {
        flex-shrink: 0;
        width: 1.25vw;
        height: 1.25vw;
        content: url("/images/stadium/RedPoint.svg");
      }

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        font-size: 3.13vw;
        gap: 1.04vw;

        :before {
          width: 3.13vw;
          height: 3.13vw;
        }
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        font-size: 4.27vw;
        gap: 2.13vw;

        :before {
          width: 6.4vw;
          height: 6.4vw;
        }
      }
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      row-gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      row-gap: 2.13vw;
    }
  }
`;
