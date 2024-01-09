import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  title?: string;
  smallTitle?: boolean;
}

export default function TitleWithoutBanner(props: IProps) {
  return (
    <>
      {props.title ? (
        <Title smallTitle={props.smallTitle} dangerouslySetInnerHTML={{ __html: props.title }} />
      ) : (
        <EmptyTitle />
      )}
    </>
  );
}

const Title = styled.h1<{ smallTitle?: boolean }>`
  position: relative;
  display: flex;
  align-items: end;
  color: ${({ theme }) => theme.colors.white_black};
  z-index: 10;
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: ${(props) => (props.smallTitle ? "2.71vw" : "4.58vw")};
  padding: 3.33vw 0 2.81vw 8.65vw;
  margin: 0;
  width: 55.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${(props) => (props.smallTitle ? "4.17vw" : "9.39vw")};
    padding: 8.34vw 3.13vw 6.52vw;
    width: inherit;
    font-weight: 700;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: ${(props) => (props.smallTitle ? "8.53vw" : "10.67vw")};
    padding: 10.67vw 4.27vw 0;
    width: 90%;
  }
`;

const EmptyTitle = styled.div`
  height: 31.25vw;
`;
