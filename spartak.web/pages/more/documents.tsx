import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { GetLayout } from "../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../src/components/mainBannerWithTitle/MainBannerWithTitle";

export default function Documents() {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <StyledBanner
        banner={"/images/tickets/rules/banner_v1.0.0.png" ?? null}
        title={getLocalValue(lang[locale].more.seowc.title, locale) || ""}
      />
      <Container>
        <p>
          В соответствии с п.6. ст.15 Федерального закона от 28.12.2013 г. № 426-ФЗ «О специальной оценке условий труда»
          (в ред. от 28.12.2022 г.) АО «ФК «Спартак-Москва» сообщает, что 29 ноября 2021 г. завершило проведение
          специальной оценки условий труда в своих подразделениях, и размещает{" "}
          <Link href={"/docs/link1.pdf"} locale="ru" passHref>
            <CustomLink>сводную ведомость ее результатов</CustomLink>
          </Link>
          , а также{" "}
          <Link href={"/docs/link2.pdf"} locale="ru" passHref>
            <CustomLink>перечень рекомендуемых мероприятий по улучшению условий труда</CustomLink>
          </Link>
          .
        </p>
        {/* <br />
        <br />
        <Link href={"/docs/doc1.pdf"} locale="ru" passHref>
          <a>
            <Span>{getLocalValue(lang[locale].more.seowc.docName1, locale)}</Span>
          </a>
        </Link>
        <br />
        <Link href={"../../docs/doc2.pdf"} locale="ru" passHref>
          <a>
            <Span>{getLocalValue(lang[locale].more.seowc.docName2, locale)}</Span>
          </a>
        </Link> */}
      </Container>
    </>
  );
}

Documents.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
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

const Container = styled(ContainerContent)`
  flex-direction: column;
  padding: 2.08vw 0;
  color: ${(props) => props.theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;
const Span = styled.span`
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  &:hover {
    color: ${theme.colors.red};
  }
  &:first-letter {
    text-transform: capitalize;
  }
`;

const CustomLink = styled.a`
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  &:hover {
    color: ${theme.colors.red};
  }
`;
