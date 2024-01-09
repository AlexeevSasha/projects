import { FC } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  srcL: string;
  srcM: string;
  srcS: string;
  className?: string;
}

export const BannerBackground: FC<IProps> = (props) => {
  return (
    <>
      {props.srcL && (
        <BgImageL>
          <NextImage src={props.srcL} objectFit="fill" quality={100}></NextImage>
        </BgImageL>
      )}
      {props.srcM && (
        <BgImageM>
          <NextImage src={props.srcM} objectFit="fill" quality={100}></NextImage>
        </BgImageM>
      )}
      {props.srcS && (
        <BgImageS>
          <NextImage src={props.srcS} objectFit="fill" quality={100}></NextImage>
        </BgImageS>
      )}
    </>
  );
};

export const StyledBannerArticleBase = styled.article`
  font-family: "FCSM Text", sans-serif;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  background-color: ${theme.colors.black};
  width: 82.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
  }
`;

export const ContentBlockBase = styled.div`
  z-index: 1;
  width: 100%;
`;

const BgImageL = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const BgImageM = styled.div`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const BgImageS = styled.div`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
