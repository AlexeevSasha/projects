import React from "react";
import { styled } from "../../../../common/styles/styled";
import { ISortElements } from "../../../../common/interfaces/ISortElements";
import { IconButtonMove } from "../../../../common/components/Icon/IconButtonMove";
import { theme } from "../../../../common/styles/theme";

interface IProps {
  id: number;
  currentSort: number;
  adjacentTop?: {
    id: number;
    sort: number;
  };
  adjacentBottom?: {
    id: number;
    sort: number;
  };
  apiSort: (elem: ISortElements) => void;
}

export const SortDiseaseInfo = (props: IProps) => {
  const setSort = (data: {
    isDisabled: boolean;
    sortBlock?: {
      id: number;
      sort: number;
    };
  }) => {
    if (!data.isDisabled && data.sortBlock) {
      props.apiSort({
        currentId: props.id,
        adjacentId: data.sortBlock.id,
        newAdjacentSort: props.currentSort,
        newCurrentSort: data.sortBlock.sort,
      });
    }
  };

  return (
    <Container>
      <ContainerArrow
        id={"pagination_prev"}
        isDisabled={!props.adjacentBottom}
        onClick={() => setSort({ isDisabled: !props.adjacentBottom, sortBlock: props?.adjacentBottom })}
      >
        <IconButtonMove color={!props.adjacentBottom ? theme.colors.hightBlue : undefined} />
      </ContainerArrow>
      <ContainerArrow
        id={"pagination_next"}
        isDisabled={!props.adjacentTop}
        onClick={() => setSort({ isDisabled: !props.adjacentTop, sortBlock: props?.adjacentTop })}
      >
        <IconButtonMove
          rotate={{ transform: "rotate(180deg)" }}
          color={!props.adjacentTop ? theme.colors.hightBlue : undefined}
        />
      </ContainerArrow>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ContainerArrow = styled.div<{ isDisabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
