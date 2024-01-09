import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { LocaleType } from "../../../api/dto/LocaleType";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { AcademyBanners } from "../academyBanners";

type DataBlock = {
  title: LocaleType;
  list?: LocaleType[];
  text?: LocaleType[];
};

type Porps = {
  data: {
    blocks: DataBlock[];
    [key: string]: any;
  };
};

export const Philosophy = ({ data }: Porps) => {
  const { locale = "ru", push } = useRouter();

  return (
    <>
      <AcademyBanners title={getLocalValue(data.title, locale)} />

      <ContainerContent>
        <StyledButton type={"opacity"} onClick={() => push("/academy/about")}>
          <IconArrowRight rotate={"180deg"} />
          {lang[locale].academy.toMain}
        </StyledButton>
      </ContainerContent>

      <ContainerContent>
        <H2>{getLocalValue(data.subTitle, locale)}</H2>
      </ContainerContent>

      <CustomContainer>
        {data.blocks.map(({ title, list, text }, i) => (
          <Block key={i}>
            <Subtitle>{getLocalValue(title, locale)}</Subtitle>

            {!!list?.length && (
              <List>
                {list.map((item, i) => (
                  <li key={i}>
                    <IconRedPoint />
                    {getLocalValue(item, locale)}
                  </li>
                ))}
              </List>
            )}

            {!!text?.length && (
              <div>
                {text.map((item, i) => (
                  <p key={i}>{getLocalValue(item, locale)}</p>
                ))}
              </div>
            )}
          </Block>
        ))}
      </CustomContainer>
    </>
  );
};

const CustomContainer = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  flex-flow: column wrap;
  padding-bottom: 6.67vw;
  max-height: 40vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 10.04vw;
    max-height: unset;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 18.67vw;
  }
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.21vw;
    margin: 3.13vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin: 6.4vw 0;
  }
`;

const Block = styled.div`
  box-sizing: border-box;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.9375vw;
  width: 50%;

  @media screen and (min-width: ${theme.rubberSize.desktop}) {
    &:nth-child(2) {
      padding-right: 1.25vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    font-size: 2.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.25vw;
  margin: 1.25vw 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const List = styled.ul`
  padding-left: 0.8vw;
  list-style: none;

  & > li {
    display: grid;
    grid: auto / auto 1fr;
    align-items: center;
    margin-top: 0.625vw;
    gap: 0.6vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-top: 1.56vw;
      gap: 1.56vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-top: 3.2vw;
      gap: 3.2vw;
    }
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: end;
  z-index: 10;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: 4.58vw;
  padding: 20.31vw 0 4.17vw 8.65vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9vw;
    font-weight: 700;
    padding: 19.27vw 0 5.21vw 4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 56vw 0 10.67vw 2.09vw;
  }
`;

const StyledButton = styled(CustomButton)`
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  border-color: ${theme.colors.grayLight};
  background-color: ${({ theme }) => theme.colors.none_whiteGray};
  column-gap: 0.42vw;
  margin: 2.08vw 0;
  padding: 0.37vw 0.69vw;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_grayDark1};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-gap: 1.04vw;
    margin: 5.22vw 0;
    padding: 0.91vw 1.7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    font-weight: 500;
    column-gap: 2.13vw;
    margin: 6.4vw 0;
    padding: 1.37vw 1.02vw;
  }
`;
