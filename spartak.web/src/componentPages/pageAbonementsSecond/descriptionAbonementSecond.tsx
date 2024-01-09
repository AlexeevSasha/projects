import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { ISubscription } from "../../api/dto/ISubscription";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

interface IProps {
  subscription?: ISubscription;
}

export const DescriptionAbonementSecond = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Content>
      <div
        dangerouslySetInnerHTML={{
          __html: getLocalValue(props.subscription?.Description, locale),
        }}
      />
    </Content>
  );
};

const Content = styled.div`
  display: flex;

  div {
    width: 100%;
    color: ${({ theme }) => theme.colors.white_black};

    img {
      max-width: 100%;
      background: ${({ theme }) => theme.colors.none_black};
    }
  }

  p {
    margin: 0;
    font-family: "FCSM Text", sans-serif;
    font-size: 0.94vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
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
    gap: 0.94vw;
    word-break: break-all;

    li {
      display: flex;
      align-items: center;
      :before {
        min-height: 2.08vw;
        min-width: 2.08vw;
        padding-right: 0.63vw;
        content: url("/images/stadium/RedPoint.svg");

        @media screen and (max-width: ${theme.rubberSize.desktop}) {
          min-height: 5.22vw;
          min-width: 5.22vw;
          padding-right: 1.56vw;
        }

        @media screen and (max-width: ${theme.rubberSize.tablet}) {
          min-height: 6.4vw;
          min-width: 6.4vw;
          padding-right: 3.2vw;
        }
      }
    }
  }
`;
