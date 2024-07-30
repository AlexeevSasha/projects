import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { IBanner } from "../../../../api/dto/content/IBanner";

interface ISrcData {
  src: string;
  file: File | null | string;
}

interface IProps {
  formValues: IBanner | null;
  srcData: ISrcData | any;
  imageHeight: number | undefined;
}

interface ButtonProps {
  buttonColor: string;
  yPosition: number;
  xPosition: number;
  buttonHeight: number;
  backGroundColor: string;
  transparentBackGround: boolean;
  fullWidth?: boolean;
  imageHeight: number | undefined;
  index: number;
}

interface Wrapper {
  xPosition: number;
}

const ButtonBanner = styled(Button)<Omit<ButtonProps, "index">>`
  z-index: 100;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.buttonColor || "transparent"};
  top: ${(props) => (props.yPosition && props.imageHeight ? `${(props.imageHeight - 30) * (props.yPosition / 100) + 30}px` : "30px")};
  margin-left: ${(props) => `${(512 - 75.25) * (props.xPosition / 100)}px`};
  margin-right: ${(props) => `${(512 - 75.25) * (props.xPosition / 100)}px`};
  width: ${(props) =>
    props.fullWidth
      ? `${512 - (512 - 75.25) * ((props.xPosition ? props.xPosition : 0) / 100) * 2 - 256}px`
      : props.xPosition
      ? `${512 - (512 - 75.25) * (props.xPosition / 100) * 2}px`
      : "512px"};
  height: ${(props) => (props.buttonHeight && props.imageHeight ? `${props.imageHeight * (props.buttonHeight / 100)}px` : "0px")};
  font-size: 8px;
  background-color: ${(props) => (props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white")};
  border-color: ${(props) => props.backGroundColor || "white"};
  :disabled {
    color: ${(props) => props.buttonColor || "transparent"};
    border-color: ${(props) => props.backGroundColor || "white"};
    background-color: ${(props) => (props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white")};
    cursor: pointer;
    :hover {
      color: ${(props) => props.buttonColor || "transparent"};
      border-color: ${(props) => props.backGroundColor || "white"};
      background-color: ${(props) =>
        props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white"};
    }
  }
  span {
    display: contents;
  }
`;

const ButtonWrapper = styled.div<Wrapper>`
  position: absolute;
  display: flex;
  z-index: 100;
  width: 512px;
  gap: ${(props) => `${(512 - 75.25) * (props.xPosition / 100)}px`};
`;

const ButtonMulti = styled(Button)<ButtonProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.buttonColor || "transparent"};
  top: ${(props) => (props.yPosition && props.imageHeight ? `${(props.imageHeight - 30) * (props.yPosition / 100) + 30}px` : "30px")};
  margin-left: ${(props) => (props.index % 2 === 0 ? `${(512 - 75.25) * (props.xPosition / 100)}px` : 0)};
  margin-right: ${(props) => (props.index % 2 !== 0 ? `${(512 - 75.25) * (props.xPosition / 100)}px` : 0)};
  width: ${(props) => (props.xPosition ? `${512 - (512 - 75.25) * (props.xPosition / 100) * 2}px` : "256px")};
  height: ${(props) => (props.buttonHeight && props.imageHeight ? `${props.imageHeight * (props.buttonHeight / 100)}px` : "0px")};
  font-size: 8px;
  background-color: ${(props) => (props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white")};
  border-color: ${(props) => props.backGroundColor || "white"};
  :disabled {
    color: ${(props) => props.buttonColor || "transparent"};
    border-color: ${(props) => props.backGroundColor || "white"};
    background-color: ${(props) => (props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white")};
    cursor: pointer;
    :hover {
      color: ${(props) => props.buttonColor || "transparent"};
      border-color: ${(props) => props.backGroundColor || "white"};
      background-color: ${(props) =>
        props.transparentBackGround ? "transparent" : props.backGroundColor ? props.backGroundColor : "white"};
    }
  }
  span {
    display: contents;
  }
`;

export const ButtonForImage = React.memo(({ formValues, srcData, imageHeight }: IProps) => {
  if (formValues?.additionalInfo?.image || srcData) {
    if (formValues?.additionalInfo?.bannerInfo?.length === 1) {
      return (
        <ButtonBanner
          shape="round"
          disabled
          imageHeight={imageHeight}
          buttonColor={formValues.additionalInfo.bannerInfo[0].color}
          yPosition={formValues.additionalInfo.bannerInfo[0].yPoint}
          xPosition={formValues.additionalInfo.bannerInfo[0].xPoint}
          buttonHeight={formValues.additionalInfo.bannerInfo[0].length}
          backGroundColor={formValues.additionalInfo.bannerInfo[0].backGroundColor}
          transparentBackGround={formValues.additionalInfo.bannerInfo[0].transparentBackGround}
          fullWidth={formValues.additionalInfo.bannerInfo[0].fullWidth}
        >
          {formValues.additionalInfo.bannerInfo[0].title}
        </ButtonBanner>
      );
    } else if (formValues?.additionalInfo?.bannerInfo?.length && formValues?.additionalInfo.bannerInfo.length > 1) {
      return (
        <ButtonWrapper xPosition={formValues.additionalInfo.bannerInfo[0].xPoint}>
          {formValues.additionalInfo.bannerInfo.map((button, index) => {
            return (
              <ButtonMulti
                shape="round"
                disabled
                imageHeight={imageHeight}
                buttonColor={button?.color}
                yPosition={button?.yPoint}
                xPosition={button?.xPoint}
                buttonHeight={button?.length}
                backGroundColor={button?.backGroundColor}
                transparentBackGround={button?.transparentBackGround}
                index={index}
              >
                {button?.title}
              </ButtonMulti>
            );
          })}
        </ButtonWrapper>
      );
    } else {
      return null;
    }
  }

  return null;
});
