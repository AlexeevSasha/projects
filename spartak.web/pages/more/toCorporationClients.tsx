import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import { cmsRepository } from "../../src/api/cmsRepository";
import { ICorporateClients } from "../../src/api/dto/ICorporateClients";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { GetLayout } from "../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../src/components/sendFormProposal/sendFormPropposal";
import { CMS } from "../../src/modules/cms/components/cms";

interface IProps {
  corporateClients: ICorporateClients;
}

export default function Index({ corporateClients }: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StyledBanner
        title={getLocalValue(corporateClients?.mainInfo?.title, locale)}
        banner={getLocalValue(corporateClients?.mainInfo?.previewImg, locale)}
        withButton={corporateClients?.form?.show}
      />
      <CMS.TextOnRedBackground info={corporateClients?.redBanner} />
      <CMS.ImgWithWysiwygInline info={corporateClients?.imgWithWysiwygInline || []} />
      {corporateClients?.form?.show && (
        <StyledPSendFormProposal>
          <SendFormProposal
            description={lang[locale].more.toCorporationClients.managerDescription}
            title={lang[locale].form.contactTheManager}
            image={corporateClients?.form?.img}
            feedbackType="CorporateClients"
          />
        </StyledPSendFormProposal>
      )}
    </>
  );
}

Index.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "corporateClients" })).value[0];
  let corporateClients;
  try {
    corporateClients = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      metaTags: corporateClients?.metaTags || null,
      corporateClients,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledBanner = styled(MainBannerWithTitle)`
  position: relative;

  & > h1 {
    width: fit-content;
  }

  & > div:nth-child(2) {
    display: block;
    position: absolute;
    bottom: 4.16vw;
    width: 100%;
    height: 2.5vw;
    padding: 0;

    & > div {
      margin: 0;
      margin-left: 8.75vw;
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      bottom: 5.21vw;
      height: 6.25vw;

      & > div {
        margin-left: 3.13vw;
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 12.8vw;
      & > div {
        margin: 0 4.27vw;
        width: 91.47vw;
        box-sizing: border-box;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > h1 {
      padding: 32.67vw 4.27vw 18.67vw;
    }
  }
`;

const StyledPSendFormProposal = styled.article`
  h1 {
    padding-bottom: 1.67vw;

    span {
      color: ${theme.colors.gray};
      padding-top: 0;
    }
  }

  article {
    padding-top: 0;
  }
`;
