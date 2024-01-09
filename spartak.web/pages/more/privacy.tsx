import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { GetLayout } from "../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { IPrivacy } from "../../src/api/dto/IPrivacy";
import { cmsRepository } from "../../src/api/cmsRepository";
import { ContainerContent } from "../../src/components/containers/containerContent";

interface IProps {
  privacy: IPrivacy;
}

export default function Privacy({ privacy }: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <StyledBanner
        title={getLocalValue(privacy?.mainInfo?.title, locale)}
        banner={getLocalValue(privacy?.mainInfo?.previewImg, locale)}
      />
      <DescriptionContainer>
        <Description dangerouslySetInnerHTML={{ __html: getLocalValue(privacy?.description, locale) }} />
      </DescriptionContainer>
    </>
  );
}

Privacy.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "privacy" })).value[0];
  let privacy;
  try {
    privacy = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      metaTags: privacy?.metaTags || null,
      privacy,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledBanner = styled(MainBannerWithTitle)`
  h1 {
    padding: 20.31vw 12.5vw 4.17vw 8.75vw;
    width: 100%;
    line-height: 6.77vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 16.95vw 11.73vw 5.22vw 3.13vw;
      line-height: 11.73vw;
      font-size: 9vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 42.67vw 0 6.4vw 4.27vw;
      line-height: 13.33vw;
      overflow-wrap: anywhere;
      font-size: 8.6vw;
    }
  }
`;

const DescriptionContainer = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  flex-direction: column;
  align-items: flex-start;
  padding: 2.08vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 11.73vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 4vw;
  }
`;

const Description = styled.div`
  margin: 0;
  font-size: 0.94vw;
  padding-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 0;
    font-size: 2.35vw;
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 10.67vw;
  }

  p {
    padding-right: 20.94vw;
  }

  strong {
    margin: 0;
    font-size: 1.67vw;
    font-weight: 700;
    padding-bottom: 0.83vw;
    padding-right: 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.17vw;
      padding-bottom: 3.13vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 8.53vw;
      padding-bottom: 6.4vw;
    }
  }

  a {
    color: ${theme.colors.red};
  }

  li {
    list-style-position: outside;
  }
`;
