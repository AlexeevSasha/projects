import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { IFoodCourtDescription } from "../interfaces/IFoodCourtDescription";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";

interface IProps {
  info: IFoodCourtDescription[];
}

// Экспортировать вне модуля только через конструкцию CMS.[Component]
export const FoodCourtDescription = ({ info }: IProps) => {
  const { locale = "ru", push } = useRouter();
  return (
    <StyledContainer>
      {info?.map((item, index) => (
        <InfoBlock key={index}>
          <InfoTextWrapper index={index}>
            <InfoText dangerouslySetInnerHTML={{ __html: getLocalValue(item?.description, locale) }} />
            {item.button.show ? (
              <ButtonBlock>
                <RestyledButton withGap type="red" onClick={() => push(getLocalValue(item.button.link, locale))}>
                  <ByTicket>{getLocalValue(item.button.text, locale)}</ByTicket>
                </RestyledButton>
              </ButtonBlock>
            ) : null}
          </InfoTextWrapper>
          <PhotoUniform countRows={item.images.length} index={index}>
            {item.images?.map((img, i) => (
              <ImgContainer key={i}>
                <NextImage src={getLocalValue(img, locale)} objectFit="cover" alt="Uniform 1" />
              </ImgContainer>
            ))}
          </PhotoUniform>
        </InfoBlock>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  display: grid;
  color: ${(props) => props.theme.colors.white_black};
  margin-bottom: 5.21vw;
  box-sizing: border-box;
  flex-direction: column;
  row-gap: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
    row-gap: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
    row-gap: 10.67vw;
  }
`;

const InfoBlock = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    gap: 10.67vw;
  }
`;

const InfoTextWrapper = styled.div<{ index: number }>`
  border: 0.05vw solid ${theme.colors.red};
  background: ${theme.colors.red}10;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "1" : "2")};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    order: 1;
  }
`;

const InfoText = styled.div`
  p {
    margin: 0;
  }

  strong {
    display: block;
    margin: 0 2.08vw 1.25vw;
    padding: 2.08vw 0 1.25vw;
    font-family: "FCSM Text", sans-serif;
    font-weight: 700;
    font-size: 2.71vw;
    border-bottom: 0.05vw solid ${theme.colors.red};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.17vw;
      padding: 2.09vw 0 1.56vw;
      margin: 0 2.09vw 1.83vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
      padding: 4.27vw 0 3.2vw;
      margin: 0 4.27vw 3.73vw;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 2.08vw 0 2.08vw;

    li {
      display: flex;
      align-items: center;
      gap: 0.63vw;
      list-style: none;
      padding: 0.83vw 0;
      font-family: Roboto, sans-serif;
      font-size: 0.94vw;

      :before {
        flex-shrink: 0;
        height: 2.08vw;
        width: 2.08vw;
        content: url("/images/stadium/RedPoint.svg");
      }

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        font-size: 1.83vw;
        padding: 1.3vw 0;
        gap: 1.04vw;

        :before {
          height: 5.22vw;
          width: 5.22vw;
        }
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        font-size: 3.73vw;
        padding: 2.67vw 0;
        gap: 2.13vw;

        :before {
          height: 6.4vw;
          width: 6.4vw;
        }
      }
    }
  }
`;

const PhotoUniform = styled.div<{ countRows: number; index: number }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repet(${({ countRows }) => countRows}, 1fr);
  grid-row-gap: 0.21vw;
  height: 100%;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "2" : "1")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 151.47vw;
    gap: 2.13vw;
    order: 1;
  }
`;

const ImgContainer = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ButtonBlock = styled.div`
  padding: 2.08vw 562px 2.08vw 2.08vw;
  width: 9.27vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2vw 17.51vw 2vw 2vw;
    width: 21.12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 39.5vw 4.27vw 4.27vw;
    width: 41.07vw;
  }
`;

const RestyledButton = styled(CustomButton)`
  padding: 0.68vw 1.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.17vw 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.33vw 2.93vw;
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
