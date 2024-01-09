import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { ContainerContent } from "../../components/containers/containerContent";

export const Container = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  position: relative;
  display: block;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.9375vw;
  margin-bottom: 8.64vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-bottom: 7.2vw;
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 2.08vw;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin-bottom: 2.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 6.4vw;
  }
`;

export const Text = styled.p<{ isListItem?: boolean }>`
  margin: 0;
  margin-bottom: 1.25vw;
  position: relative;
  box-sizing: border-box;
  padding-left: ${({ isListItem }) => isListItem && "2.7vw"};
  width: ${({ isListItem }) => isListItem && "37.91vw"};

  &::before {
    content: ${({ isListItem }) => isListItem && '" "'};
    position: absolute;
    width: 0.83vw;
    height: 0.83vw;
    background: ${theme.colors.red};
    border-radius: 50%;
    top: 50%;
    left: 0.625vw;
    transform: translateY(-50%);
  }

  & a {
    color: ${theme.colors.red};
    cursor: pointer;
    text-decoration: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
    width: 100%;
    padding-left: ${({ isListItem }) => isListItem && "6.78vw"};

    &::before {
      width: 2.08vw;
      height: 2.08vw;
      left: 1.56vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
    padding-left: ${({ isListItem }) => isListItem && "9.6vw"};

    &::before {
      width: 2.56vw;
      height: 2.56vw;
      left: 1.92vw;
      top: 1.92vw;
    }
  }
`;

export const Button = styled(CustomButton)`
  padding-top: 0;
  padding-bottom: 0;
  height: 2.395vw;
  width: max-content;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 7.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    height: 15.46vw;
  }
`;

export const Label = styled.div`
  font-size: 1.66vw;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin-bottom: 2.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
    margin-bottom: 6.4vw;
  }
`;

export const CmsText = styled.div`
  p {
    margin: 0;
  }
  a {
    color: ${theme.colors.red};
    cursor: pointer;
    text-decoration: none;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;

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
`;
