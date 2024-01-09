import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { ThemeContext } from "../../../core/themeProvider";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CustomButton } from "../../buttons/customButton";
import { ContainerContent } from "../../containers/containerContent";
import { Tour } from "../tour";
import { TourWarning } from "./tourWarning";
import { ICustomTour, IPriceBlock } from "../../../api/dto/IEscursionTour";

export const AboutBlockImgText = (props: ICustomTour) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Container position={props.type}>
      <ContainerText position={props.type}>
        <Title>{getLocalValue(props.title, locale)}</Title>
        {getLocalValue(props.description, locale) && (
          <Description
            dangerouslySetInnerHTML={{
              __html: getLocalValue(props.description, locale),
            }}
          />
        )}
        <PriceBlock>
          {getLocalValue(props.priceFrom, locale) && (
            <Price>
              {getLocalValue(props.priceFrom, locale)}
              {getLocalValue(props.priceTo, locale) && ` / ${getLocalValue(props.priceTo, locale)}`}
              {"  ₽"}
            </Price>
          )}
          {getLocalValue(props.link, locale) && (
            <Link href={getLocalValue(props.link, locale)} passHref>
              <CustomLink target="_blank">
                <RedButton type={"red"} withGap onClick={() => { }}>
                  <IconArrowRight />
                  <span>{getLocalValue(props.buttonName, locale)}</span>
                </RedButton>
              </CustomLink>
            </Link>
          )}
        </PriceBlock>
        {getLocalValue(props.additionalInfo, locale) && (
          <WarningContainer>
            <TourWarning text={props.additionalInfo} />
          </WarningContainer>
        )}
        {getLocalValue(props.additionalDescription, locale).length > 12 && (
          <WarningContainer>
            <TourWarning text={props.additionalDescription} />
          </WarningContainer>
        )}
      </ContainerText>

      <ImageColumn>
        {getLocalValue(props.img, locale) && (
          <InfoImage withoutShadow={!isDarkTheme} position={props.type}>
            <NextImage src={getLocalValue(props.img, locale) ?? ""} objectFit="cover" />
          </InfoImage>
        )}
        {getLocalValue(props.price1?.label, locale) && (
          <ContainerParams>
            <Tour.AboutParams blockParams={[props.price1 as IPriceBlock, props.price2 as IPriceBlock]} />
          </ContainerParams>
        )}
      </ImageColumn>
    </Container>
  );
};

const Container = styled(ContainerContent) <{ position?: string }>`
  margin-bottom: 5.21vw;
  display: grid;
  grid-template-columns: ${({ position }) => (position === "left" ? "34.9vw 40.63vw" : "40.63vw 34.9vw")};
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const ContainerText = styled.div<{ position?: string }>`
  display: flex;
  flex-direction: column;
  order: ${({ position }) => (position === "left" ? 3 : 1)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    order: 1;
  }
`;

const Title = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-top: 6.4vw;
  }
`;

const Description = styled.div`
  display: block;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-top: 6.4vw;
  }
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: unset;
    flex-direction: column;
    margin-top: 6.4vw;
  }
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 2.08vw;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
`;

const RedButton = styled(CustomButton)`
  & > svg > path {
    stroke: ${theme.colors.white};
  }
  padding: 0.58vw 1.04vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.43vw 2.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.47vw 4.27vw;
    margin-top: 6.4vw;
  }
`;

const WarningContainer = styled.div`
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  order: 2;
`;

const InfoImage = styled.div<{ withoutShadow?: boolean; position?: string }>`
  position: relative;
  height: 28.75vw;

  :before {
    content: " ";
    background: ${({ withoutShadow }) =>
    withoutShadow ? "" : "linear-gradient(89.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%)"};
    transform: ${({ position }) => (position === "left" ? "" : "matrix(-1, 0, 0, 1, -1, 0)")};
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    position: absolute;
    z-index: 1;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 52.58vw;

    :before {
      background: ${({ withoutShadow }) =>
    withoutShadow ? "" : "linear-gradient(175.86deg, rgba(13, 17, 22, 0) 0%, #0d1116 93.24%)"};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 60.8vw;
  }
`;

const ContainerParams = styled.div`
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;
