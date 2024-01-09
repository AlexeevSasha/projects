import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { lang } from "../../../../../public/locales/lang";
import { TicketsPremium } from "../../../../api/dto/ITicketsPremium";

interface IProps {
  packagesData: TicketsPremium["data"]["hospitalityPackages"];
}

export const FoodCourtDescription = (props: IProps) => {
  const { locale = "ru", push } = useRouter();
  return (
    <StyledContainer>
      {props.packagesData?.map((item, index) => (
        <PackagesBlock key={item.title}>
          <Package index={index}>
            <Title>{item.title}</Title>
            <PackageList>
              {item?.foodCourtData?.map((el, index) => (
                <li key={`k${index}`}>
                  <IconRedPoint />
                  {el}
                </li>
              ))}
            </PackageList>
            <ButtonBlock>
              <RestyledButton
                withGap
                type="red"
                onClick={() => push(`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`)}
              >
                <ByTicket>{lang[locale].button.buyTicket}</ByTicket>
              </RestyledButton>
            </ButtonBlock>
          </Package>

          <PhotoUniform countRows={item.images.length} index={index}>
            {item.images?.map((img, index) => (
              <ImgContainer key={index}>
                <NextImage src={img} objectFit="cover" alt="Uniform 1" />
              </ImgContainer>
            ))}
          </PhotoUniform>
        </PackagesBlock>
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

const PackagesBlock = styled.section`
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

const Package = styled.div<{ index: number }>`
  border: 0.05vw solid ${theme.colors.red};
  background: ${theme.colors.red}10;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "1" : "2")};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    order: 1;
  }
`;

const Title = styled.h1`
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
`;

const PackageList = styled.ul`
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

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 1.83vw;
      padding: 1.3vw 0;
      gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 3.73vw;
      padding: 2.67vw 0;
      gap: 2.13vw;
    }
  }
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
