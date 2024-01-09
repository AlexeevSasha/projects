import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../containers/containerContent";

interface IProps {
  itemsCount: number;
  currentPage: number;
  pageSize?: number;
  shallow?: boolean;
  onPageChange?: (page: { selected: number }) => void;
}

export const Pagination = ({ currentPage, itemsCount, pageSize = 10, shallow = false, onPageChange }: IProps) => {
  const router = useRouter();
  const pageCount = Math.ceil(itemsCount / pageSize);

  const handlePagination = (page: { selected: number }) => {
    if (!isNaN(page.selected)) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: page.selected + 1 },
        },
        undefined,
        { scroll: false, shallow }
      );
    }
  };

  return (
    <StyledContainer>
      <StyledPaginate
        activeClassName="active"
        containerClassName="pagination"
        breakClassName={"breakButton"}
        previousClassName={"prevNextButtons"}
        nextClassName={"prevNextButtons"}
        onPageChange={onPageChange || handlePagination}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        forcePage={currentPage - 1}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  padding: 2.08vw 0 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 0 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0 10.67vw;
  }
`;

const StyledPaginate = styled(ReactPaginate)`
  font-size: 0.83vw;
  padding: 0;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  display: flex;
  color: ${({ theme }) => theme.colors.white_black};
  list-style: none;
  margin: 0;
  width: 100%;

  li {
    border: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_gray1}`};
    background: ${({ theme }) => theme.colors.blackLight_whiteGray};
    cursor: pointer;

    &.active {
      border: none;
      color: ${theme.colors.white};
    }
    a {
      display: block;
      padding: 0.704vw 0.963vw;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding: 1.76vw 2.403vw;
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        padding: 3.605vw 4.921vw;
      }
    }
  }

  .active {
    background: ${theme.colors.red};
  }

  .prevNextButtons {
    display: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    justify-content: left;
  }
`;
