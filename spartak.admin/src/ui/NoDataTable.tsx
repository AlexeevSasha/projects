import React from "react";
import { ReactComponent as Nodata } from "assets/images/NoData.svg";
import styled from "styled-components";

export const NoDataTable = () => {
  return (
    <ContainerNoData>
      <Nodata />
      <span>Нет данных</span>
    </ContainerNoData>
  );
};

const ContainerNoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
