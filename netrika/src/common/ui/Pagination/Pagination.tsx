import { optionPage } from "common/constants";
import { theme } from "common/styles/theme";
import * as React from "react";
import { ICustomSelect } from "common/interfaces/ISelect";
import { styled } from "../../styles/styled";
import { IconArrow } from "../../components/Icon/IconArrow";
import { CustomSelect } from "../Select/CustomSelect";

interface IProps {
  page: number;
  allCount: number;
  countFromPage: number;
  onClick: (newPage: number) => void;
  selectPageCount?: (value: string | number) => void;
}

export const Pagination: React.FC<IProps> = ({ allCount, page, countFromPage, onClick, selectPageCount }) => {
  const pageApp = () => {
    if (page * countFromPage < allCount) {
      onClick(page + 1);
    }
  };

  const pageDown = () => {
    if (page !== 1) {
      onClick(page - 1);
    }
  };
  const onChangeSelect = (value: ICustomSelect) => {
    if (selectPageCount) {
      selectPageCount(value.value);
    }
  };

  return (
    <FilterContainer id="pagination">
      <CountLines>
        <span> Кол-во строк:</span>
        <CustomSelect
          htmlID={"pagination_count"}
          SelectValue={{ label: countFromPage, value: countFromPage }}
          options={optionPage}
          onChange={onChangeSelect}
        />
      </CountLines>
      <Container>
        <span id={"pagination_info"}>
          {countFromPage * page - countFromPage + 1}-{countFromPage * page > allCount ? allCount : countFromPage * page}{" "}
          из {allCount}
        </span>
        <ContainerArrow onClick={pageDown} id={"pagination_prev"}>
          <IconArrow rotate={"90deg"} color={theme.colors.white} width={"16px"} height={"8px"} />
        </ContainerArrow>
        <ContainerArrow onClick={pageApp} id={"pagination_next"}>
          <IconArrow rotate={"-90deg"} color={theme.colors.white} width={"16px"} height={"8px"} />
        </ContainerArrow>
      </Container>
    </FilterContainer>
  );
};

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.hightBlue};
  margin-bottom: 10px;
`;

export const CountLines = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerArrow = styled.div`
  background: ${theme.colors.green};
  border-radius: 2px;
  display: flex;

  align-items: center;
  padding: 7px 3px;
  margin-left: 10px;
  cursor: pointer;
`;
