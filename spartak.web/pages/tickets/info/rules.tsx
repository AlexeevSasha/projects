import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { LocaleType } from "../../../src/api/dto/LocaleType";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { RulesDescription } from "../../../src/componentPages/pageTickets/info/rules/rulesDescription";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";

interface IProps {
  title: LocaleType;
  rulesDescription: [
    {
      title: string;
      text: string;
    }
  ];
}

export default function Rules(props: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <StyledBanner
        banner={"/images/tickets/rules/banner_v1.0.0.png" ?? null}
        title={getLocalValue(props.title, locale) || ""}
      />
      <RulesDescription rulesDescription={props.rulesDescription} />
    </>
  );
}

Rules.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const rules = require(`../../../public/mockJSON/ticketsInfo/rules/${locale}.json`);
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/tickets/rules"] || null,
      title: (seodata as Record<string, any>)["/tickets/rules"].h1 || null,
      rulesDescription: rules.rules,
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
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 42.67vw 0 10.67vw 4.27vw;
      line-height: 13.33vw;
    }
  }
`;
