import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ILoyaltyRules } from "../../../../../pages/more/loyalty/rules";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

export const LoyaltyFieldsdRules = (props: ILoyaltyRules) => {
  const { locale = "ru" } = useRouter();
  return (
    <Content>
      <div dangerouslySetInnerHTML={{ __html: getLocalValue(props?.info?.description, locale) || "" }} />
    </Content>
  );
};

const Content = styled.div`
  padding: 0 29.69vw 6.25vw 8.75vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;

  a {
    text-decoration: none;
    color: ${theme.colors.fireEngineRed};
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

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw 8.34vw;
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw 10.67vw;
    font-size: 4.27vw;
  }
`;
