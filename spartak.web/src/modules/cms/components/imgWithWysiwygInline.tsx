import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { NextImage } from "../../../ui/nextImage/nextImage";
import React from "react";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IImgWithWysiwygInline } from "../interfaces/IImgWithWysiwygInline";

interface IProps {
  info: IImgWithWysiwygInline[];
}

export const ImgWithWysiwygInline = ({ info }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <>
      {info?.map((sectorInfo, index) => (
        <StyledContainer key={`k${index}`}>
          <ImgContainer index={index}>
            <InfoImageContainer index={index}>
              <NextImage src={sectorInfo.img || ""} objectFit="cover" />
            </InfoImageContainer>
          </ImgContainer>
          <InfoSection
            index={index}
            dangerouslySetInnerHTML={{ __html: getLocalValue(sectorInfo?.description, locale) }}
          />
        </StyledContainer>
      )) || null}
    </>
  );
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5.21vw;
  background: ${(props) => props.theme.colors.black_white};

  p {
    margin: 0;
  }

  :last-child {
    padding-bottom: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
const ImgContainer = styled.div<{ index: number }>`
  height: 25.94vw;
  width: 34.9vw;
  position: relative;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "1" : "2")};
  background-size: 100% auto;
  background-position-y: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-position-y: initial;
    width: 93.87vw;
    height: 36.77vw;
    order: 1;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 36.27vw;
    margin-bottom: 4.27vw;
  }
`;
const InfoImageContainer = styled.div<{ index: number }>`
  position: relative;
  height: inherit;

  :before {
    content: " ";
    background: ${({ theme }) => theme.gradients.field_none};
    transform: ${(props) => (props.index % 2 === 0 || 0 ? "" : "matrix(-1, 0, 0, 1, -1, 0)")};
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    position: absolute;
    z-index: 1;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      background: linear-gradient(175.86deg, rgba(13, 17, 22, 0) 0%, #0d1116 93.24%);
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-position-y: initial;
    order: 1;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
  }
`;

const InfoSection = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40.63vw;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "2" : "1")};
  gap: 2.08vw;

  strong {
    display: block;
    font-family: "FCSM Text", sans-serif;
    font-weight: 700;
    font-size: 2.08vw;
    color: ${(props) => props.theme.colors.white_black};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.17vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }

  p {
    display: block;
    color: ${(props) => props.theme.colors.grayLight_grayDark};
    font-family: "FCSM Text", sans-serif;
    font-size: 1.25vw;
    font-weight: 500;

    a {
      text-decoration: none;
      color: ${theme.colors.red};
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.colors.white_grayDark};
    row-gap: 0.83vw;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: grid;
      grid-template-columns: 2.08vw 1fr;
      grid-column-gap: 0.63vw;
      align-items: center;
      font-size: 1.25vw;
      font-weight: 500;

      :before {
        flex-shrink: 0;
        height: 2.08vw;
        width: 2.08vw;
        content: url("/images/stadium/RedPoint.svg");
      }

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        font-size: 2.35vw;
        grid-template-columns: 5.22vw 1fr;
        grid-column-gap: 1.56vw;

        :before {
          height: 5.22vw;
          width: 5.22vw;
        }
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        font-size: 4.27vw;
        grid-template-columns: 6.4vw 1fr;
        grid-column-gap: 3.2vw;

        :before {
          height: 6.4vw;
          width: 6.4vw;
        }
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 100%;
    width: 100%;
    order: 2;
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;
