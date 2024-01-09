import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const H1 = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  text-align: center;
  align-self: center;
  color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    white-space: break-spaces;
    font-size: 6.4vw;
    line-height: 1em;
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.66vw;
  }

  & > *:first-child {
    margin-right: 0.83vw;
    border: 1px solid ${theme.colors.red};
    color: ${theme.colors.red};
    font-family: "FCSM Text", sans-serif;
    font-weight: 600;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-right: 2.08vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.26vw;
    }
  }
`;

export const Alert = styled.div<{ color?: string }>`
  font-family: "Roboto", sans-serif;
  background: rgba(240, 90, 79, 0.1);
  display: flex;
  gap: 0.41vw;
  padding: 0.41vw 0.83vw;
  font-size: 0.73vw;
  color: ${({ color }) => color || "#272c32"};
  min-height: 2.5vw;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    padding: 1vw 1.6vw;
    min-height: 7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 2vw 3.2vw;
    min-height: 12.8vw;
  }

  & > span {
    align-self: center;
    padding: 0 0.5vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 0 1.5vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 0 3vw;
    }
  }

  & > svg {
    font-size: 1vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }
`;

export const FormContent = styled.div`
  margin: 1.3vw 0 2.08vw;

  & > label {
    margin-bottom: 1.04vw;
    font-weight: 400;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.73vw 0 5.21vw;

    & > label {
      margin-bottom: 2.6vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 7.47vw 0 6.4vw;

    & > label {
      margin-bottom: 5.33vw;
    }
  }
`;

export const Prompt = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.grayDark};
  width: 90%;
  text-align: center;
  align-self: center;
  margin-top: 0.41vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-top: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    width: 90%;
    margin-top: 2.13vw;
  }
`;
