import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../public/locales/lang";
import { theme } from "../src/assets/theme/theme";
import { CustomButton } from "../src/components/buttons/customButton";
import { ContainerContent } from "../src/components/containers/containerContent";
import { Layout } from "../src/components/layout/layout";
import { NextImage } from "../src/ui/nextImage/nextImage";

export default function NotFound() {
  const { locale = "ru", push } = useRouter();

  return (
    <Layout metaTags={metaTags}>
      <Container>
        <div>
          <Error>404</Error>

          <Title>{lang[locale].notFound.title}</Title>

          <Text>{lang[locale].notFound.text}</Text>

          <Button type="red" onClick={() => push("/")}>
            {lang[locale].notFound.button}
          </Button>
        </div>

        <ImageBlock>
          <BgImage><NextImage src="/images/errorPage/bg_v1.0.0.png" /></BgImage>
          <NextImage src="/images/errorPage/404_img_v1.0.0.png" />
        </ImageBlock>

        <Button type="red" onClick={() => push("/")} mobile>
          {lang[locale].notFound.button}
        </Button>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

// NotFound.getLayout = GetLayout;

const metaTags = {
  titleName: { Ru: "Страница не найдена", En: "This page doesn't exist | Spartak" },
  titleOg: { Ru: "Страница не найдена", En: "This page doesn't exist | Spartak" },
  descriptionOg: {
    Ru: "Извините, искомая страница не найдена!",
    En: "Sorry, the page you requested does not exist. Try searching for something else.",
  },
};

const Container = styled(ContainerContent)`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 6.25vw auto;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text";

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw auto;
    display: block;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw auto;
  }
`;

const Error = styled.h1`
  font-size: 48px;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.38vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.78vw;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2.08vw;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    font-size: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.26vw;
    font-size: 6.4vw;
  }
`;

const Text = styled.p`
  margin: 1.25vw 0 3.33vw;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw 0 8.34vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 4.26vw 0 10.66vw;
    font-size: 4.26vw;
  }
`;

const Button = styled(CustomButton) <{ mobile?: boolean }>`
  width: fit-content;
  display: ${({ mobile }) => (mobile ? "none" : "flex")};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ mobile }) => (mobile ? "flex" : "none")};
  }
`;

const ImageBlock = styled.div`
  width: 48.33vw;
  height: 29.63vw;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 57.62vw;
    margin-top: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 54.93vw;
    margin: 0 0 10.66vw;
  }
`;
const BgImage = styled(ImageBlock)`
  position: absolute;  
`;