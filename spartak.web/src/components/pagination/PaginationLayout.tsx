import React from "react";
import styled from "styled-components";
import { Pagination } from "./pagination";
import { PaginationSize } from "./PaginationSize";
import { theme } from "../../assets/theme/theme";

interface IProps {
  justifyContent: "space-between" | "flex-end" | "center" | "space-around";
  pageSize: number;
  itemsCount: number;
  currentPage: number;
  sizeSteps: [string, string, string];
  needsPagSize?: boolean;
}

export const PaginationLayout = ({
  justifyContent,
  pageSize,
  itemsCount,
  currentPage,
  sizeSteps,
  needsPagSize = true,
}: IProps) => {
  return (
    <Container justifyContent={justifyContent}>
      <Pagination pageSize={pageSize} itemsCount={itemsCount} currentPage={currentPage} />
      {needsPagSize && <PaginationSize sizeSteps={sizeSteps} />}
    </Container>
  );
};

const Container = styled.article<{ justifyContent: string }>`
  display: flex;
  width: 100%;
  color: ${theme.colors.white};
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    align-items: flex-end;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 6.4vw;

    & > article {
      width: auto;
      padding: 6.4vw 0 0;
    }
  }
`;
