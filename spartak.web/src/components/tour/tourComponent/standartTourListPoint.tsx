import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../buttons/customButton";
import { ContainerContent } from "../../containers/containerContent";
import { NextLink } from "../../nextLink/nextLink";
import { Tour } from "../tour";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { IStandardTour, IPriceBlock } from "../../../api/dto/IEscursionTour";

export const StandardTourListPoint = (props: IStandardTour) => {
  const { locale = "ru" } = useRouter();

  return (
    <CustomContainer>
      <PackagesBlock>
        <Package>
          <Title>{getLocalValue(props.title, locale)}</Title>
          <Description>{getLocalValue(props.description, locale)}</Description>

          <PackageList>
            {props.options?.map((el, index) => (
              <li key={`k${index}`}>
                <IconRedPoint />

                {getLocalValue(el, locale)}
              </li>
            ))}
          </PackageList>

          <NextLink url={getLocalValue(props.link, locale)}>
            <RestyledButton withGap type="red">
              <IconArrowRight />
              <ByTicket>{getLocalValue(props.buttonName, locale)}</ByTicket>
            </RestyledButton>
          </NextLink>
        </Package>

        <ImgContainer>
          <NextImage src={getLocalValue(props.img, locale)} objectFit="cover" alt="Uniform 1" />
        </ImgContainer>

        <Tour.AboutParams blockParams={[props.price1 as IPriceBlock, props.price2 as IPriceBlock]} />

        <Tour.Warning text={props.pricesDescription} />
      </PackagesBlock>
    </CustomContainer>
  );
};

const CustomContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white_black};

  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const PackagesBlock = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "package imgContainer" "tourAboutParam tourWarning";
  grid-gap: 1.25vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-areas: "imgContainer" "package" "tourAboutParam" "tourWarning";
    grid-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
  }
`;

const Package = styled.div`
  border: 0.05vw solid ${theme.colors.red};
  background: ${({ theme }) => theme.colors.redOpacity_fireEngineRedOpacity};
  padding: 2.08vw;

  grid-area: package;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
  }
`;

const Title = styled.h3`
  font-size: 2.71vw;
  margin: 0 0 0.83vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    margin: 0 0 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin: 0 0 4.27vw;
  }
`;

const Description = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.46vw;
  padding-bottom: 0.83vw;
  border-bottom: 0.05vw solid ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
    padding-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 7.47vw;
    padding-bottom: 4.27vw;
  }
`;

const PackageList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 0 0.83vw;
  padding: 0;

  li {
    display: grid;
    grid: auto / auto 1fr;
    align-items: center;
    grid-column-gap: 0.63vw;
    list-style: none;
    padding: 0.83vw 0;
    font-family: Roboto, sans-serif;
    font-size: 0.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 5.22vw;

    li {
      font-size: 1.83vw;
      padding: 1.3vw 0;
      grid-column-gap: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;

    li {
      font-size: 3.73vw;
      padding: 2.67vw 0;
      grid-column-gap: 2.13vw;
    }
  }
`;

const RestyledButton = styled(CustomButton)`
  padding: 0.58vw 0.89vw;
  width: fit-content;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.44vw 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.5vw 23.3vw;
    white-space: nowrap;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const ByTicket = styled.span`
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;

  grid-area: imgContainer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 83.44vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 80vw;
  }
`;
