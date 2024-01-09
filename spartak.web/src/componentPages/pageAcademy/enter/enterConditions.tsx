import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IAcademyEnter } from "../../../api/dto/IAcademyEnter";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  enterData?: IAcademyEnter;
}
export const EnterConditions = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <Content>
      <div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: getLocalValue(props.enterData?.info.firstParagraph, locale) }} />
          <TabletMobileImage
            src={getLocalValue(props.enterData?.info.firstParagraphImg, locale)}
            alt={"FirstParagraphImg"}
            objectFit={"cover"}
          />
        </div>

        <div>
          <div dangerouslySetInnerHTML={{ __html: getLocalValue(props.enterData?.info.secondParagraph, locale) }} />
          <TabletMobileImage
            src={getLocalValue(props.enterData?.info.secondParagraphImg, locale)}
            alt={"SecondParagraphImg"}
            objectFit={"cover"}
          />
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: getLocalValue(props.enterData?.info.thirdParagraph, locale) }} />
          <TabletMobileImage
            src={getLocalValue(props.enterData?.info.thirdParagraphImg, locale)}
            alt={"ThirdParagraphImg"}
            objectFit={"cover"}
          />
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: getLocalValue(props.enterData?.info.fourthParagraph, locale) }} />
          <TabletMobileImage
            src={getLocalValue(props.enterData?.info.fourthParagraphImg, locale)}
            alt={"FourthParagraphImg"}
            objectFit={"cover"}
          />
        </div>
      </div>

      <SecondColumnDesktop>
        <StyledImage
          src={getLocalValue(props.enterData?.info.firstParagraphImg, locale)}
          alt={"FirstParagraphImg"}
          objectFit={"cover"}
        />
        <StyledImage
          src={getLocalValue(props.enterData?.info.secondParagraphImg, locale)}
          alt={"SecondParagraphImg"}
          objectFit={"cover"}
        />
        <StyledImage
          src={getLocalValue(props.enterData?.info.thirdParagraphImg, locale)}
          alt={"ThirdParagraphImg"}
          objectFit={"cover"}
        />
        <StyledImage
          src={getLocalValue(props.enterData?.info.fourthParagraphImg, locale)}
          alt={"FourthParagraphImg"}
          objectFit={"cover"}
        />
      </SecondColumnDesktop>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 34.9vw;
  column-gap: 6.98vw;
  row-gap: 4.17vw;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-gap: 0;
    grid-template-columns: 1fr;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.red};
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.94vw;

    li {
      display: flex;
      align-items: center;
    }

    li::before {
      padding-right: 0.63vw;
      min-height: 2.08vw;
      min-width: 2.08vw;
      content: url("/images/stadium/RedPoint.svg");

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-right: 1.56vw;
        min-height: 5.22vw;
        min-width: 5.22vw;
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        padding-right: 3.2vw;
        min-height: 6.4vw;
        min-width: 6.4vw;
      }
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.5vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const StyledImage = styled(NextImage)`
  height: 31.25vw;

  &:after {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: absolute;
    background: ${({ theme }) => theme.gradients.academyEnter_none};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 59.97vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 44.53vw;
  }
`;

const SecondColumnDesktop = styled.div`
  display: grid;
  row-gap: 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const TabletMobileImage = styled(StyledImage)`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
    margin: 8.34vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    margin: 6.4vw 0;

    :last-child {
      margin: 6.4vw 0 0;
    }
  }
`;
